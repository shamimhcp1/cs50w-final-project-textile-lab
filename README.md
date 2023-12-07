# cs50w-final-project-textile-lab
TextileLab Report Builder: Create garment test reports with ease! This web app, built using Python and JavaScript, simplifies the process of generating comprehensive lab reports for textiles. It offers a user-friendly interface for entering data and produces detailed reports, making textile testing more efficient. 

# Specification
This web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
- **Models** : Design necessery models for the application.
- **API** : Implement django `restframework` for the every models.
- **User login, Register** : Design and develop user login system with multiple user role. Each user can perform different tasks.
- **Buyers** : Create, View, Edit, Update, Delete buyers.
- **Dev Format** : Each buyer can have single or multiple development format.
- **Dev Color Shade** : Each buyer can have single color shade or have multiple color shade.
- **Dev Requirements** : Store the textile test passing requirements for individual buyers and grade the test report passed/failed according the dev requirements.
- **Dev Report** : Create development reports.
- **Frontend** : Design and develop the mobile-responsive frontend of the application with React.js.

# How to use

### Step 1: Clone the Repository

`git clone https://github.com/shamimhcp1/cs50w-final-project-textile-lab.git`
`cd cs50w-final-project-textile-lab`

### Step 2: Create and Activate Virtual Environment
# On Windows
`python -m venv env`

# On macOS/Linux
`python3 -m venv env`

# Activate the virtual environment

# On Windows
`.\env\Scripts\activate`

# On macOS/Linux
`source env/bin/activate`

Your terminal prompt should change, indicating that the virtual environment is now active.

### Step 3: Install Dependencies

`pip install -r requirements.txt`

### Step 4: Database Setup
# Apply migrations
`python manage.py makemigrations`
`python manage.py migrate`

### Step 5: Run the Django Development Server
`python manage.py runserver`

The development server should now be running at `http://127.0.0.1:8000/`.

# Project Structure
Briefly explain the structure of your project, e.g., main directories and their purposes.

- **your_app/:** Description of your app or main Django app.
- **templates/:** HTML templates.
- **static/:** Static files (CSS, JavaScript, images).

# Usage
Explain how to use your project or any important instructions for users and developers.

# Contributing
If you would like to contribute to this project, please feel free contact me at `shamimhcp@gmail.com`