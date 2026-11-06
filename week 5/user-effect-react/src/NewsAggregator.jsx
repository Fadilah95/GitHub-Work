import { useEffect, useState } from "react";

function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  const CACHE_KEY = "newsAggregatorCache";
  const CACHE_DURATION = 5 * 60 * 1000;

  // =========================================
  // NORMALIZE NEWS API DATA
  // =========================================
  const normalizeNewsApi = (data) => {
    return data.articles.map((article, index) => ({
      id: `newsapi-${index}`,
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source?.name || "NewsAPI",
      provider: "NewsAPI",
      publishedAt: article.publishedAt,
    }));
  };

  // =========================================
  // NORMALIZE GNEWS DATA
  // =========================================
  const normalizeGNews = (data) => {
    return data.articles.map((article, index) => ({
      id: `gnews-${index}`,
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      source: article.source?.name || "GNews",
      provider: "GNews",
      publishedAt: article.publishedAt,
    }));
  };

  // =========================================
  // FETCH FROM NEWS API
  // =========================================
  const fetchNewsAPI = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${NEWS_API_KEY}`
    );

    if (response.status === 429) {
      throw new Error("NewsAPI rate limit reached.");
    }

    if (!response.ok) {
      throw new Error(
        `NewsAPI error: ${response.status}`
      );
    }

    const data = await response.json();

    return normalizeNewsApi(data);
  };

  // =========================================
  // FETCH FROM GNEWS
  // =========================================
  const fetchGNews = async () => {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=${GNEWS_API_KEY}`
    );

    if (response.status === 429) {
      throw new Error("GNews rate limit reached.");
    }

    if (!response.ok) {
      throw new Error(
        `GNews error: ${response.status}`
      );
    }

    const data = await response.json();

    return normalizeGNews(data);
  };

  // =========================================
  // FETCH ALL NEWS
  // =========================================
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cachedNews = localStorage.getItem(CACHE_KEY);

      if (cachedNews) {
        const parsedCache = JSON.parse(cachedNews);

        const cacheAge =
          Date.now() - parsedCache.timestamp;

        if (cacheAge < CACHE_DURATION) {
          setArticles(parsedCache.articles);
          setLoading(false);

          return;
        }
      }

      // Fetch from multiple APIs
      const results = await Promise.allSettled([
        fetchNewsAPI(),
        fetchGNews(),
      ]);

      let combinedArticles = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          combinedArticles = [
            ...combinedArticles,
            ...result.value,
          ];
        }
      });

      if (combinedArticles.length === 0) {
        throw new Error(
          "Unable to load news from all sources."
        );
      }

      // Sort latest news first
      combinedArticles.sort(
        (a, b) =>
          new Date(b.publishedAt) -
          new Date(a.publishedAt)
      );

      setArticles(combinedArticles);

      // Save cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          articles: combinedArticles,
        })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD NEWS WHEN COMPONENT STARTS
  // =========================================
  useEffect(() => {
    fetchNews();
  }, []);

  // =========================================
  // CLEAR CACHE AND REFRESH
  // =========================================
  const refreshNews = () => {
    localStorage.removeItem(CACHE_KEY);

    fetchNews();
  };

  // =========================================
  // SEARCH AND FILTER
  // =========================================
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      article.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSource =
      selectedSource === "all" ||
      article.provider === selectedSource;

    return matchesSearch && matchesSource;
  });

  // =========================================
  // USER INTERFACE
  // =========================================
  return (
    <div className="news-container">
      <h1>News Aggregator</h1>

      <p>
        Latest news collected from multiple sources.
      </p>

      <div className="controls">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={selectedSource}
          onChange={(e) =>
            setSelectedSource(e.target.value)
          }
        >
          <option value="all">
            All Sources
          </option>

          <option value="NewsAPI">
            NewsAPI
          </option>

          <option value="GNews">
            GNews
          </option>
        </select>

        <button onClick={refreshNews}>
          Refresh News
        </button>
      </div>

      {loading && (
        <p className="loading">
          Loading news...
        </p>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>

          <button onClick={refreshNews}>
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredArticles.length === 0 && (
          <p>No news found.</p>
        )}

      <div className="news-grid">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="news-card"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
              />
            )}

            <div className="news-content">
              <span className="provider">
                {article.provider}
              </span>

              <h2>{article.title}</h2>

              <p>
                {article.description ||
                  "No description available."}
              </p>

              <small>
                Source: {article.source}
              </small>

              <br />

              <small>
                {article.publishedAt
                  ? new Date(
                      article.publishedAt
                    ).toLocaleString()
                  : "Date unavailable"}
              </small>

              <br />

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                Read Full Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsAggregator;