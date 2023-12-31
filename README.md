# Introduction 🚀
TextileLab Report Builder: Create garment test reports with ease! This web app, built using Python and JavaScript, simplifies the process of generating comprehensive lab reports for textiles. It offers a user-friendly interface for entering data and produces detailed reports, making textile testing more efficient. 

# Distinctiveness and complexity
The distinctiveness and complexity of this project lie in its focus on the textile industry and the specific needs of generating lab reports for textile testing. TextileLab is tailored to the unique requirements of textile properties.

## Key Features
- **Textile-Specific Parameters:** The application is designed to capture and report on textile-specific parameters such as tear strength, tensile strength and colorfastness to rubbing.

- **Comprehensive Reports:** The generated reports go beyond basic excel data entry, providing detailed insights into textile characteristics. This complexity is essential for users in the textile industry who require specific information for quality control and analysis.

- **PDF Report Generation and Download:** The system can compile the test report data and create a detailed lab report in PDF format. Clicking on the 'Download' button user can save the report in local machine.

- **Role-Based Access:** The inclusion of different user roles (Superuser, Staff, and Normal User) adds complexity to the project. Each role has distinct permissions, ensuring secure access control.

- **User-Friendly Interface:** The user interface is designed to be intuitive, allowing users to easily input data without a steep learning curve. This focus on usability enhances the distinctiveness of the project.

# Project Structure
What’s contained in each file I've created, e.g., main directories and their purposes.

- **development/:** The `development` directory is the core of the project, containing the Django app responsible for the application's functionality.
- **templates/:** The `templates` directory includes two main layouts: one for the app dashboard and another for the login/register pages. 
- **static/my_script.js:** This file houses all the React.js code for the project. It plays a crucial role in the frontend development, handling dynamic aspects of the user interface.
- **static/assets/:** The `assets` directory contains necessary files for the theme's static components, including CSS, JavaScript, and images. 

# How to run the application

### Step 1: Clone the Repository
`git clone https://github.com/shamimhcp1/cs50w-final-project-textile-lab.git`

### Step 2: Install Dependencies
`pip install -r requirements.txt`

### Step 3: Database Setup
#### Apply migrations
- `python manage.py makemigrations`
- `python manage.py migrate`

### Step 4: Run the Django Development Server
`python manage.py runserver`

The development server should now be running at `http://127.0.0.1:8000/`.

# Other Additional Information
1. **Create Buyer:** At the beginning of the testing process, users are required to follow a structured workflow. Firstly, create a buyer profile. Once the buyer is created, proceed to add specific buyer requirements for testing.

2. **Create Requirements:** The buyer requirements should encompass the necessary details for the textile testing procedures. This step ensures that the testing process aligns with the buyer's expectations and standards. Include information such as preferred testing methods, testing passing requirements etc.

3. **Create Report:** After defining the buyer and their testing requirements, users can then create a test report entry that associates the buyer with their specific testing criteria. This organized approach ensures a systematic and comprehensive textile testing process within TextileLab. Each step builds upon the previous one, creating a seamless and efficient experience for users.

# Usage
The TextileLab Report Builder includes three types of roles: Superuser, Staff, and Normal User, each with different access permissions.

##### Superuser Account
- username: `user_a`
- password: `user_a`

Superusers have elevated privileges and can access all features of the application.

##### Staff Account
- username: `coordinator_lab`
- password: `coordinator_lab`

Staff accounts are intended for users with basic permissions for data entry and report generation.

##### Normal Account
Upon registering, users are assigned Normal User accounts. These accounts have no permissions. This user require access permission from the superuser.

# Contributing
If you are interested in contributing to this project, please reach out to the project owner at `shamimhcp@gmail.com`. Your contributions are welcome and can help enhance the functionality and features of TextileLab.