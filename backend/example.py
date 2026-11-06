# name = "Fadilah"
# age = 31
# height = 157
# is_student = True

# print(f"Name: {name},Age: {age}")

# x = "Welcome"
# print(x[0])
# print(x[3:6])
# print(x[3:])
# print(x[:5])
# print(x.upper())
# print(x.lower())
# print("come" in x)
# print("come1" in x)
# print(x.replace("Welc", "H"))

# x = 3
# y = 2.5
# print(x + y) #5.5
# print(x - y) #0.5
# print(x * y) #7.5
# print(x / y) #1.2

# import math
# z = 3.14159
# print(round(z, 2)) #3.14
# print(math.floor(z)) #3
# print(math.ceil(z)) #4
# print(f"{z:.2f}") #3.14

# num1 = input("Enter the first number:")
# num2 = input("Enter the second number:")
# print(num1 + num2) #54
# print(int(num1) + int(num2)) #9

# x = "42"
# y = 3.99
# z = 0
# print(int(x)) #42
# print(int(y)) #3
# print(float(x)) #42.0
# print(str(y)) #'3.99'
# print(bool(z)) #False
# print(bool(x)) #True


# age = 20
# if age >= 18:
#     print("Adult.")
# else:
#     print("Minor.")

# age = 19
# if age >= 18 and age <=20:
#     print("Freshman")
# elif age > 20 and age <=22:
#     print("Sophomore")
# elif age > 22:
#     print("Graduate")

# for i in range(1, 6):
#     print(f"Number: {i}")

# for i in range(1, 6):
#     print(f"Number: {i}")
#     if i == 3:
#         break
# print("Loop ended")

# for i in range(1, 11):
#     if i % 2 == 0:
#         continue
#     print(f"Odd Number: {i}")
# print("Loop ended")

# def greet_user():
#     print("Hello, welcome to the program!")
#     print("I hope you have a great experience.")
#     print("Let's get started!")
# greet_user()
# greet_user()

# def calculate_area(length, width):
#     area = length * width
#     return area
# result = calculate_area(2, 3)
# print(f"Area: {result}")

# fruits = ["apple", "banana", "orange"]
# fruits.append("grape")
# fruits.insert(1, "mango")
# fruits.remove("apple")
# print(fruits) #['mango', 'banana', 'orange', 'grape']
# print(fruits[0]) #mango
# print(fruits[-1]) #grape

# numbers = [3, 1, 4, 1,  5, 9, 2]
# numbers.sort()
# print(numbers) #[1, 1, 2, ,3, 4, 5, 9]
# numbers.reverse()
# print(numbers) #[9, 5, 4, 3, 2, 1, 1]
# print(numbers.count(1)) #2
# print(numbers.index(1)) #5

# todos = []
# todos.append("Buy groceries")
# todos.append("Clean the house")
# todos.append("Pay bills")
# print("To-Do List:")
# for index, task in enumerate(todos, 1):
#     print(f"{index}. {task}")

# person = {
#     "name": "Fadilah",
#     "age": 31,
#     "city": "Kota Kinabalu"
# }
# print(person["name"])
# person["email"] = "fadilah@gmail.com"
# print(person)
# for key in person:
#     print(key)
# for value in person.values():
#     print(value)
# for key, value in person.items():
#     print(f"{key}: {value}")

try:
    result = 10 / 0
except:
    print("Error: cannot divide by zero.")
finally:
    print("Closing. . .")

try:
    numerator = 10
    denominator = int(input("Enter a denominator: "))
    result = numerator / denominator
except:
    print("Error: cannot divide by zero!")
else:
    print(f"Success! Result = {result}")
finally:
    print("Closing. . .")