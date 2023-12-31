const app = document.getElementById('app');

const CreateUser = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage }) => {
    // submitCreateUserForm using create-user url
    const submitCreateUserForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('createUserForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/create-user', {
            method: 'POST',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to user list page');
                    // redirect to user list page
                    setCurrentView('manage-user'); // Update currentView
                    setActiveMenuItem('manage-user')
                } else {
                    console.log('Failed to create user. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };


    return (
        <div class="col-md-12 col-lg-6">
            {getMessage && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {getMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Add User</h5>
                </div>
                <div class="card-body">
                    <form action="" method="POST" id="createUserForm" autoComplete="off">
                        <div class="form-floating form-floating-outline mb-4">
                            <select class="form-select" name="role" id="role">
                                <option value="staff">Staff</option>
                                <option value="superuser">Superuser</option>
                                <option value="user">User</option>
                            </select>
                            <label for="role">Role</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="text" class="form-control" name="username" id="username" placeholder="username" />
                            <label for="username">Username</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="email" class="form-control" name="email" id="email" placeholder="email" />
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" name="password" id="password" placeholder="password" />
                            <label for="Password">Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" name="confirmation" id="confirmation" placeholder="Confirm Password" />
                            <label for="confirmation">Confirm Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <div class="form-check mt-3">
                                <input
                                    name="is_active"
                                    class="form-check-input"
                                    type="radio"
                                    value="1"
                                    id="is_active_1"
                                    checked />
                                <label class="form-check-label" for="is_active_1"> Active </label>
                            </div>
                            <div class="form-check">
                                <input
                                    name="is_active"
                                    class="form-check-input"
                                    type="radio"
                                    value="0"
                                    id="is_active_0" />
                                <label class="form-check-label" for="is_active_0"> Deactive </label>
                            </div>
                        </div>
                        <button type="submit" onClick={submitCreateUserForm} class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditUser = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage, updatedUser, setUpdatedUser }) => {
    // submitEditUserForm using edit-user url
    const submitEditUserForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('editUserForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/edit-user', {
            method: 'PUT',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to user list page');
                    // redirect to user list page
                    setCurrentView('manage-user'); // Update currentView
                    setActiveMenuItem('manage-user')
                } else {
                    console.log('Failed to edit user. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div class="col-md-12 col-lg-6">
            {getMessage && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {getMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Add User</h5>
                </div>
                <div class="card-body">
                    <form action="" method="POST" id="editUserForm" autoComplete="off">
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="hidden" name="id" value={updatedUser.id} />
                            <select class="form-select" name="role" id="role"
                                value={updatedUser.is_superuser ? 'superuser' : updatedUser.is_staff ? 'staff' : 'user'}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, is_superuser: e.target.value === 'superuser' ? true : false, is_staff: e.target.value === 'staff' ? true : false })}
                            >
                                <option value="superuser"
                                    selected={updatedUser.is_superuser ? true : false}
                                >Superuser</option>
                                <option value="staff"
                                    selected={updatedUser.is_staff ? true : false}
                                >Staff</option>
                                <option value="user"
                                    selected={updatedUser.is_superuser === false && updatedUser.is_staff === false ? true : false}
                                >User</option>
                            </select>
                            <label for="role">Role</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="text" class="form-control" name="username" id="username" placeholder="username"
                                value={updatedUser.username}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                            />
                            <label for="username">Username</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="email" class="form-control" name="email" id="email" placeholder="email"
                                value={updatedUser.email}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            />
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" name="password" id="password" placeholder="password" />
                            <label for="Password">Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" name="confirmation" id="confirmation" placeholder="Confirm Password" />
                            <label for="confirmation">Confirm Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <div class="form-check mt-3">
                                <input
                                    name="is_active"
                                    class="form-check-input"
                                    type="radio"
                                    value="1"
                                    id="is_active_1"
                                    checked={updatedUser.is_active ? true : false}
                                    onChange={() => setUpdatedUser({ ...updatedUser, is_active: true })}
                                />
                                <label class="form-check-label" for="is_active_1"> Active </label>
                            </div>
                            <div class="form-check">
                                <input
                                    name="is_active"
                                    class="form-check-input"
                                    type="radio"
                                    value="0"
                                    id="is_active_0"
                                    checked={updatedUser.is_active ? false : true}
                                    onChange={() => setUpdatedUser({ ...updatedUser, is_active: false })}
                                />
                                <label class="form-check-label" for="is_active_0"> Deactive </label>
                            </div>
                        </div>
                        <button type="submit" onClick={submitEditUserForm} class="btn btn-primary">Update User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
const ManageUser = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage, updatedUser, setUpdatedUser }) => {

    // fetch user list from database url manage-user
    const [userList, setUserList] = React.useState([]);
    React.useEffect(() => {
        fetch('/development/manage-user')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setUserList(data.userList);
                } else {
                    console.log('Failed to fetch user list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // delete user
    const deleteUser = (userId) => {
        fetch(`/development/delete-user?id=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('User deleted successfully');
                    // remove the deleted user from userList
                    const newUserList = userList.filter(user => user.id !== userId);
                    setUserList(newUserList);
                } else {
                    console.log('Failed to delete user. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // editUser
    const editUser = (userId) => {
        fetch(`/development/edit-user?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('User fetched successfully');
                    setUpdatedUser(data.user); // Update updatedUser
                    setCurrentView('edit-user'); // Update currentView
                } else {
                    console.log('Failed to fetch user. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div class="col-md-12 col-lg-12">
            {getMessage && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {getMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div class="card">
                <h5 class="card-header">Manage Users</h5>
                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead class="table-light">
                            <tr>
                                <th class="text-truncate">Username</th>
                                <th class="text-truncate">Email</th>
                                <th class="text-truncate">Role</th>
                                <th class="text-truncate">Status</th>
                                <th class="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* display loading bar before userList show */}
                            {userList.length === 0 && (
                                <tr>
                                    <td colSpan="5" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {userList.map((user, index) => (
                                <tr key={index}>
                                    <td class="text-truncate">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-sm me-3">
                                                <img src="/static/development/assets/img/avatars/1.png" alt="Avatar" class="rounded-circle" />
                                            </div>
                                            <div>
                                                <h6 class="mb-0 text-truncate">{user.username}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-truncate">{user.email}</td>
                                    <td class="text-truncate">
                                        {/* check superuser*/}
                                        {user.is_superuser && (<span class="badge bg-label-success rounded-pill">Superuser</span>)}
                                        {/* check staff*/}
                                        {user.is_staff && (<span class="badge bg-label-primary rounded-pill">Staff</span>)}
                                        {/* check normal user */}
                                        {user.is_superuser === false && user.is_staff === false && (<span class="badge bg-label-warning rounded-pill">User</span>)}

                                    </td>
                                    <td>
                                        {user.is_active ? (
                                            <span class="badge bg-label-success rounded-pill">Active</span>
                                        ) : (
                                            <span class="badge bg-label-danger rounded-pill">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i class="mdi mdi-dots-vertical"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault; editUser(user.id) }}
                                                ><i class="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                >
                                                <a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault; deleteUser(user.id) }}
                                                ><i class="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                                >
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ChangePassword = ({ getMessage, setMessage, currentView, setCurrentView, }) => {
    // submitChangePasswordForm
    const submitChangePasswordForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('changePasswordForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/change-password', {
            method: 'PUT',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Password changed successfully');
                } else {
                    console.log('Failed to change password. Status:', data.status);
                }
                setMessage(data.message); // Update message
                form.reset(); // Reset the form
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
                form.reset(); // Reset the form
            });
    };


    return (
        <div class="col-md-12 col-lg-6">
            {getMessage && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {getMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Change Password</h5>
                </div>
                <div class="card-body">
                    <form method="POST" action="" id="changePasswordForm">
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="current_password" name="current_password" placeholder="Current Password" />
                            <label for="current_password">Current Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="new_password" name="new_password" placeholder="New Password" />
                            <label for="new_password">New Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm New Password" />
                            <label for="confirm_password">Confirm New Password</label>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={submitChangePasswordForm}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


const DashboardWidget = ({ handleMenuClick, handleMainMenuClick, user, setUser }) => {
    return (
        <div className="col-lg-12">
            <div class="d-flex flex-wrap" id="icons-container">
                {user.is_superuser && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-buyer'); handleMainMenuClick('buyer'); }} >
                        <div class="card icon-card cursor-pointer text-center mb-4 mx-2">
                            <div class="card-body">
                                <i class="mdi mdi-account-group mdi-36px"></i>
                                <p class="icon-name text-capitalize text-truncate mb-0 mt-2">Buyers</p>
                            </div>
                        </div>
                    </a>
                )}
                {user.is_superuser && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-requirement'); handleMainMenuClick('requirement'); }} >
                        <div class="card icon-card cursor-pointer text-center mb-4 mx-2">
                            <div class="card-body">
                                <i class="mdi mdi-clipboard mdi-36px"></i>
                                <p class="icon-name text-capitalize text-truncate mb-0 mt-2">Requirements</p>
                            </div>
                        </div>
                    </a>
                )}

                {/* hide if user is not staff */}
                {user.is_staff && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-report'); handleMainMenuClick('report'); }} >
                        <div class="card icon-card cursor-pointer text-center mb-4 mx-2">
                            <div class="card-body">
                                <i class="mdi mdi-file-document mdi-36px"></i>
                                <p class="icon-name text-capitalize text-truncate mb-0 mt-2">Reports</p>
                            </div>
                        </div>
                    </a>
                )}
                {user.is_superuser && (
                    <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-user'); handleMainMenuClick('user'); }} >
                        <div class="card icon-card cursor-pointer text-center mb-4 mx-2">
                            <div class="card-body">
                                <i class="mdi mdi-account mdi-36px"></i>
                                <p class="icon-name text-capitalize text-truncate mb-0 mt-2">Users</p>
                            </div>
                        </div>
                    </a>
                )}
                <a href="#" onClick={(e) => { e.preventDefault(); handleMenuClick('change-password'); }} >
                    <div class="card icon-card cursor-pointer text-center mb-4 mx-2">
                        <div class="card-body">
                            <i class="mdi mdi-key mdi-36px"></i>
                            <p class="icon-name text-capitalize text-truncate mb-0 mt-2">Change Password</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};


const CreateBuyer = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage }) => {

    // submit the below form with fetch
    const submitCreateBuyerForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('createBuyerForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/create-buyer', {
            method: 'POST',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to buyer list page');
                    // redirect to buyer list page
                    setCurrentView('manage-buyer'); // Update currentView
                    setActiveMenuItem('manage-buyer')
                } else {
                    console.log('Failed to create buyer. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div className="col-md-12 col-lg-6">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Create Buyer</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="createBuyerForm">
                        <div className="form-floating form-floating-outline mb-4">
                            <input type="text" className="form-control" name="name" id="name" placeholder="Buyer Name" />
                            <label htmlFor="name">Buyer Name</label>
                        </div>
                        <div className="form-floating form-floating-outline mb-4">
                            <div className="form-check mt-3">
                                <input
                                    name="is_active"
                                    className="form-check-input"
                                    type="radio"
                                    value="1"
                                    id="is_active_1"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="is_active_1"> Active </label>
                            </div>
                            <div className="form-check">
                                <input
                                    name="is_active"
                                    className="form-check-input"
                                    type="radio"
                                    value="0"
                                    id="is_active_0"
                                />
                                <label className="form-check-label" htmlFor="is_active_0"> Deactive </label>
                            </div>
                        </div>
                        <button type="submit" onClick={submitCreateBuyerForm} className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditBuyer = ({ currentView, setCurrentView, updatedBuyer, setUpdatedBuyer, getMessage, setMessage }) => {

    // submit the below form with fetch
    const submitUpdateBuyerForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('updateBuyerForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/edit-buyer', {
            method: 'PUT',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to buyer list page');
                    // redirect to buyer list page
                    setCurrentView('manage-buyer'); // Update currentView
                } else {
                    console.log('Failed to update buyer. Status:', data.status);
                }
                setMessage(data.message); // Update message              
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div className="col-md-12 col-lg-6">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Edit Buyer</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="updateBuyerForm">
                        <div className="form-floating form-floating-outline mb-4">
                            <input type="hidden" name="id" value={updatedBuyer.id} />
                            <input type="text" className="form-control" name="name" id="name" placeholder="Buyer Name" value={updatedBuyer.name}
                                onChange={(e) => setUpdatedBuyer({ ...updatedBuyer, name: e.target.value })} />
                            <label htmlFor="name">Buyer Name</label>
                        </div>
                        <div className="form-floating form-floating-outline mb-4">
                            <div className="form-check mt-3">
                                <input
                                    name="is_active"
                                    className="form-check-input"
                                    type="radio"
                                    value="1"
                                    id="is_active_1"
                                    checked={updatedBuyer.is_active}
                                    onChange={() => setUpdatedBuyer({ ...updatedBuyer, is_active: true })}
                                />
                                <label className="form-check-label" htmlFor="is_active_1"> Active </label>
                            </div>
                            <div className="form-check">
                                <input
                                    name="is_active"
                                    className="form-check-input"
                                    type="radio"
                                    value="0"
                                    id="is_active_0"
                                    checked={!updatedBuyer.is_active}
                                    onChange={() => setUpdatedBuyer({ ...updatedBuyer, is_active: false })}
                                />
                                <label className="form-check-label" htmlFor="is_active_0"> Deactive </label>
                            </div>
                        </div>
                        <button type="submit" onClick={submitUpdateBuyerForm} className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ManageBuyer = ({ getMessage, setMessage, currentView, setCurrentView, updatedBuyer, setUpdatedBuyer }) => {
    // fetch buyer list from database url manage-buyer
    const [buyerList, setBuyerList] = React.useState([]);
    React.useEffect(() => {
        fetch('/development/manage-buyer')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setBuyerList(data.buyerList);
                } else {
                    console.log('Failed to fetch buyer list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // delete buyer
    const deleteBuyer = (buyerId) => {
        fetch(`/development/delete-buyer?id=${buyerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Buyer deleted successfully');
                    // remove the deleted buyer from buyerList
                    const newBuyerList = buyerList.filter(buyer => buyer.id !== buyerId);
                    setBuyerList(newBuyerList);
                    setMessage(data.message);
                } else {
                    console.log('Failed to delete buyer. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // edit buyer
    const editBuyer = (buyerId) => {
        fetch(`/development/edit-buyer?id=${buyerId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Buyer fetched successfully');
                    setUpdatedBuyer(data.buyer); // Update updatedBuyer
                    setCurrentView('edit-buyer'); // Update currentView
                } else {
                    console.log('Failed to fetch buyer. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="col-md-12 col-lg-6">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card">
                <h5 className="card-header">Manage Buyers</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="text-truncate">SL</th>
                                <th className="text-truncate">Name</th>
                                <th className="text-truncate">Status</th>
                                <th className="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* display loading bar before buyerlist show */}
                            {buyerList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {buyerList.map((buyer, index) => (
                                <tr key={index}>
                                    <td className="text-truncate">{index + 1}</td>
                                    <td className="text-truncate">{buyer.name}</td>
                                    <td>
                                        {buyer.is_active ? (
                                            <span className="badge bg-label-success rounded-pill">Active</span>
                                        ) : (
                                            <span className="badge bg-label-danger rounded-pill">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; editBuyer(buyer.id) }}
                                                ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                >
                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; deleteBuyer(buyer.id) }}
                                                ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                                >
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const CreateRequirement = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage }) => {
    // fetch buyer list from database url manage-buyer
    const [buyerList, setBuyerList] = React.useState([]);

    React.useEffect(() => {
        fetch('/development/get-active-buyer')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setBuyerList(data.buyerList);
                } else {
                    console.log('Failed to fetch buyer list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // submitCreateRequirementForm
    const submitCreateRequirementForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('createRequirementForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/create-requirement', {
            method: 'POST',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to requirement list page');
                    // redirect to requirement list page
                    setCurrentView('manage-requirement'); // Update currentView
                    setActiveMenuItem('manage-requirement')
                } else {
                    console.log('Failed to create requirement. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div className="col-xxl">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Add Requirements</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="createRequirementForm">

                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="buyer">Buyer</label>
                            <div className="col-sm-4">
                                <select id="buyer" name="buyer" className="form-select">
                                    <option>--</option>
                                    {buyerList.map((buyer, index) => (
                                        <option key={index} value={buyer.id}>{buyer.name}</option>
                                    ))}
                                </select>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="requirement_label">Label</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="requirement_label" id="requirement_label" placeholder="Label" />
                            </div>
                        </div>

                        {/* Rubbing */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="dry_rubbing">Dry Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="dry_rubbing" id="dry_rubbing" placeholder="Dry Rubbing" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="wet_rubbing">Wet Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wet_rubbing" id="wet_rubbing" placeholder="Wet Rubbing" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="rubbing_method">Rubbing Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="rubbing_method" id="rubbing_method" placeholder="Rubbing Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="rubbing_text">Rubbing Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="rubbing_text" id="rubbing_text" placeholder="Rubbing Text" />
                            </div>
                        </div>

                        {/* Wash Tear */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="wash_tear_warp">Wash Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_warp" id="wash_tear_warp" placeholder="Wash Tear Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="wash_tear_weft">Wash Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_weft" id="wash_tear_weft" placeholder="Wash Tear Weft" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tear_method">Tear Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tear_method" id="tear_method" placeholder="Tear Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tear_text">Tear Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tear_text" id="tear_text" placeholder="Tear Text" />
                            </div>
                        </div>

                        {/* Tensile */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_warp">Tensile Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_warp" id="tensile_warp" placeholder="Tensile Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_weft">Tensile Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_weft" id="tensile_weft" placeholder="Tensile Weft" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_method">Tensile Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_method" id="tensile_method" placeholder="Tensile Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_text">Tensile Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_text" id="tensile_text" placeholder="Tensile Text" />
                            </div>
                        </div>

                        {/* Is Active (Radio Buttons) */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-4">
                                <div className="form-check form-check-inline">
                                    <input
                                        name="is_active"
                                        className="form-check-input"
                                        type="radio"
                                        value="1"
                                        id="is_active_1"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="is_active_1"> Active </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        name="is_active"
                                        className="form-check-input"
                                        type="radio"
                                        value="0"
                                        id="is_active_0"
                                    />
                                    <label className="form-check-label" htmlFor="is_active_0"> Deactive </label>
                                </div>

                            </div>
                        </div>

                        {/* <!-- Save --> */}
                        <div className="row justify-content-end">
                            <div className="col-sm-10">
                                <button type="submit" onClick={submitCreateRequirementForm} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

const ManageRequirement = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage, updatedRequirement, setUpdatedRequirement }) => {
    // fetch dev requirement list from database url manage-requirement
    const [devRequirementList, setDevRequirementList] = React.useState([]);
    React.useEffect(() => {
        fetch('/development/manage-requirement')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setDevRequirementList(data.devRequirementList);
                } else {
                    console.log('Failed to fetch dev requirement list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // deleteRequirement
    const deleteRequirement = (requirementId) => {
        fetch(`/development/delete-requirement?id=${requirementId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Requirement deleted successfully');
                    // remove the deleted requirement from devRequirementList
                    const newDevRequirementList = devRequirementList.filter(devRequirement => devRequirement.id !== requirementId);
                    setDevRequirementList(newDevRequirementList);
                    setMessage(data.message);
                } else {
                    console.log('Failed to delete requirement. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // editRequirement
    const editRequirement = (requirementId) => {
        fetch(`/development/edit-requirement?id=${requirementId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Requirement fetched successfully');
                    setUpdatedRequirement(data.devRequirement); // Update updatedRequirement
                    setCurrentView('edit-requirement'); // Update currentView
                } else {
                    console.log('Failed to fetch requirement. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="col-md-12 col-lg-8">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card">
                <h5 className="card-header">Manage Requirements</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="text-truncate">#</th>
                                <th className="text-truncate">Buyer</th>
                                <th className="text-truncate">Requirements Label</th>
                                <th className="text-truncate">Status</th>
                                <th className="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* display loading bar before buyerlist show */}
                            {devRequirementList.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {devRequirementList.map((devRequirement, index) => (
                                <tr key={index}>
                                    <td className="text-truncate">{index + 1}</td>
                                    <td className="text-truncate">{devRequirement.buyer_name}</td>
                                    <td className="text-truncate">{devRequirement.requirement_label}</td>
                                    <td>
                                        {devRequirement.is_active ? (
                                            <span className="badge bg-label-success rounded-pill">Active</span>
                                        ) : (
                                            <span className="badge bg-label-danger rounded-pill">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; editRequirement(devRequirement.id) }}
                                                ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                >
                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; deleteRequirement(devRequirement.id) }}
                                                ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                                >
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EditRequirement = ({ currentView, setCurrentView, updatedRequirement, setUpdatedRequirement, getMessage, setMessage }) => {
    // submitUpdateRequirementForm
    const submitUpdateRequirementForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('updateRequirementForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/edit-requirement', {
            method: 'PUT',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to requirement list page');
                    // redirect to requirement list page
                    setCurrentView('manage-requirement'); // Update currentView
                } else {
                    console.log('Failed to update requirement. Status:', data.status);
                }
                setMessage(data.message); // Update message              
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };
    return (
        <div className="col-xxl">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Edit Requirement</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="updateRequirementForm">

                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="buyer">Buyer</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="buyer"
                                    id="buyer"
                                    placeholder="Label"
                                    value={updatedRequirement.buyer_name} // Set value to updatedRequirement property
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, buyer_name: e.target.value })}
                                    disabled
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="requirement_label">Label</label>
                            <div className="col-sm-4">
                                {/* requirement id */}
                                <input type="hidden" name="id" value={updatedRequirement.id} />

                                <input type="text" className="form-control" name="requirement_label" id="requirement_label" placeholder="Label"
                                    value={updatedRequirement.requirement_label} // Set value to updatedRequirement property
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, requirement_label: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Rubbing */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="dry_rubbing">Dry Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="dry_rubbing" id="dry_rubbing" placeholder="Dry Rubbing"
                                    value={updatedRequirement.dry_rubbing}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, dry_rubbing: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="wet_rubbing">Wet Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wet_rubbing" id="wet_rubbing" placeholder="Wet Rubbing"
                                    value={updatedRequirement.wet_rubbing}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, wet_rubbing: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="rubbing_method">Rubbing Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="rubbing_method" id="rubbing_method" placeholder="Rubbing Method"
                                    value={updatedRequirement.rubbing_method}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, rubbing_method: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="rubbing_text">Rubbing Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="rubbing_text" id="rubbing_text" placeholder="Rubbing Text"
                                    value={updatedRequirement.rubbing_text}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, rubbing_text: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Wash Tear */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="wash_tear_warp">Wash Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_warp" id="wash_tear_warp" placeholder="Wash Tear Warp"
                                    value={updatedRequirement.wash_tear_warp}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, wash_tear_warp: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="wash_tear_weft">Wash Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_weft" id="wash_tear_weft" placeholder="Wash Tear Weft"
                                    value={updatedRequirement.wash_tear_weft}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, wash_tear_weft: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tear_method">Tear Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tear_method" id="tear_method" placeholder="Tear Method"
                                    value={updatedRequirement.tear_method}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tear_method: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tear_text">Tear Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tear_text" id="tear_text" placeholder="Tear Text"
                                    value={updatedRequirement.tear_text}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tear_text: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Tensile */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_warp">Tensile Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_warp" id="tensile_warp" placeholder="Tensile Warp"
                                    value={updatedRequirement.tensile_warp}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tensile_warp: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_weft">Tensile Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_weft" id="tensile_weft" placeholder="Tensile Weft"
                                    value={updatedRequirement.tensile_weft}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tensile_weft: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_method">Tensile Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_method" id="tensile_method" placeholder="Tensile Method"
                                    value={updatedRequirement.tensile_method}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tensile_method: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tensile_text">Tensile Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_text" id="tensile_text" placeholder="Tensile Text"
                                    value={updatedRequirement.tensile_text}
                                    onChange={(e) => setUpdatedRequirement({ ...updatedRequirement, tensile_text: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Is Active (Radio Buttons) */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-4">
                                <div className="form-check form-check-inline">
                                    <input
                                        name="is_active"
                                        className="form-check-input"
                                        type="radio"
                                        value="1"
                                        id="is_active_1"
                                        checked={updatedRequirement.is_active} // Set checked based on updatedRequirement
                                        onChange={() => setUpdatedRequirement({ ...updatedRequirement, is_active: true })}
                                    />
                                    <label className="form-check-label" htmlFor="is_active_1"> Active </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        name="is_active"
                                        className="form-check-input"
                                        type="radio"
                                        value="0"
                                        id="is_active_0"
                                        checked={!updatedRequirement.is_active} // Set checked based on updatedRequirement
                                        onChange={() => setUpdatedRequirement({ ...updatedRequirement, is_active: false })}
                                    />
                                    <label className="form-check-label" htmlFor="is_active_0"> Deactive </label>
                                </div>
                            </div>
                        </div>


                        {/* <!-- Save --> */}
                        <div className="row justify-content-end">
                            <div className="col-sm-10">
                                <button type="submit" onClick={submitUpdateRequirementForm} className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
// create report
const CreateReport = ({ currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage,
    uniqueBuyerListRequirement, requirementList, getRequirementList }) => {

    // submitCreateReportForm
    const submitCreateReportForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('createReportForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/create-report', {
            method: 'POST',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to report list page');
                    // redirect to report list page
                    setCurrentView('manage-report'); // Update currentView
                    setActiveMenuItem('manage-report')
                } else {
                    console.log('Failed to create report. Status:', data.status);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };

    return (
        <div className="col-xxl">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Create Report</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="createReportForm" autoComplete="off">
                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="buyer">Buyer</label>
                            <div className="col-sm-4">
                                <select id="buyer" name="buyer" className="form-select"
                                    onChange={(e) => { e.preventDefault; getRequirementList(e.target.value) }} >
                                    <option>--</option>
                                    {uniqueBuyerListRequirement.map((buyer, index) => (
                                        <option key={index} value={buyer.buyer__id}>{buyer.buyer__name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <!-- Requirements --> */}
                            <label className="col-sm-2 col-form-label" for="requirement">Requirements</label>
                            <div className="col-sm-4">
                                <select id="requirement" name="requirement" className="form-select"
                                    // if requirementList is empty, disable the select element
                                    disabled={requirementList.length === 0 ? true : false}
                                >
                                    {requirementList.map((requirement, index) => (
                                        <option key={index} value={requirement.id}>{requirement.requirement_label} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <!-- Date --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="receive_date">Receive Date</label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" name="receive_date" id="receive_date" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="report_date">Report Date</label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" name="report_date" id="report_date" />
                            </div>
                        </div>
                        {/* <!-- Style --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="style">Style</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="style" id="style" placeholder="Style" />
                            </div>
                        </div>
                        {/* <!-- Color --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="color">Color</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="color" id="color" placeholder="Color" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="sample_type">Sample Type</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="sample_type" id="sample_type" placeholder="Sample Type" />
                            </div>
                        </div>
                        {/* <!-- Fabric Reference --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="fab_ref">Fabric Reference</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="fab_ref" id="fab_ref" placeholder="Fabric Reference" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="fab_supplier">Supplier</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="fab_supplier" id="fab_supplier" placeholder="Supplier" />
                            </div>
                        </div>

                        {/* <!-- Rubbing --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="dry_rubbing">Dry Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="dry_rubbing" id="dry_rubbing" placeholder="Dry Rubbing" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wet_rubbing">Wet Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wet_rubbing" id="wet_rubbing" placeholder="Wet Rubbing" />
                            </div>
                        </div>
                        {/* <!-- Raw Tear --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="raw_tear_warp">Raw Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="raw_tear_warp" id="raw_tear_warp" placeholder="Raw Tear Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="raw_tear_weft">Raw Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="raw_tear_weft" id="raw_tear_weft" placeholder="Raw Tear Warp" />
                            </div>
                        </div>
                        {/* <!-- Wash Tear --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="wash_tear_warp">Wash Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_warp" id="wash_tear_warp" placeholder="Wash Tear Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wash_tear_weft">Wash Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_weft" id="wash_tear_weft" placeholder="Wash Tear Weft" />
                            </div>
                        </div>
                        {/* <!-- Tensile --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="tensile_warp">Tensile Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_warp" id="tensile_warp" placeholder="Tensile Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="tensile_weft">Tensile Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_weft" id="tensile_weft" placeholder="Tensile Weft" />
                            </div>
                        </div>
                        {/* <!-- Save --> */}
                        <div className="row justify-content-end">
                            <div className="col-sm-10">
                                <button type="submit" onClick={submitCreateReportForm} className="btn btn-primary m-2">Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};


// Manage Report
const ManageReport = ({ currentView, setCurrentView, getMessage, setMessage, updatedReport, setUpdatedReport,
    deleteReport, viewReport, downloadReport, editReport }) => {

    // fetch report list from database url manage-report with pagination

    const [reportList, setReportList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalReports, setTotalReports] = React.useState(0);
    const [limit, setLimit] = React.useState(4);
    React.useEffect(() => {
        fetch(`/development/manage-report?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setReportList(data.reportList);
                    setTotalPages(data.totalPages);
                    setTotalReports(data.totalReports);
                }
                else {
                    console.log('Failed to fetch report list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }
            );
    }, [page, limit]);

    // handlePageChange
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="col-md-12 col-lg-12">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card">
                <h5 className="card-header">Manage Reports</h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="text-truncate">#</th>
                                <th className="text-truncate">Buyer</th>
                                <th className="text-truncate">Style</th>
                                <th className="text-truncate">Color</th>
                                <th className="text-truncate">Result</th>
                                <th className="text-truncate">Create Date</th>
                                <th className="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* display loading bar before reportList show */}
                            {reportList.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {reportList.map((report, index) => (
                                <tr key={index}>
                                    <td className="text-truncate">{index + 1}</td>
                                    <td className="text-truncate">{report.buyer_name}</td>
                                    <td className="text-truncate">{report.style}</td>
                                    <td className="text-truncate">{report.color}</td>
                                    {/* get result, if result is ok green, if result not ok red, else warning */}
                                    <td>
                                        {report.result === 'Result is Ok' ? (
                                            <span className="badge bg-label-success rounded-pill">Result is Ok</span>
                                        ) : report.result === 'Result Not Ok' ? (
                                            <span className="badge bg-label-danger rounded-pill">Result Not OK</span>
                                        ) : (
                                            <span className="badge bg-label-warning rounded-pill">See Data Sheet</span>
                                        )}
                                    </td>
                                    <td className="text-truncate">{report.create_date}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                {/* view report */}
                                                <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; viewReport(report.id) }}
                                                ><i className="mdi mdi-eye-outline me-1"></i> View</a
                                                >
                                                {/* download report  */}
                                                <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; downloadReport(report.id) }}
                                                ><i className="mdi mdi-download-outline me-1"></i> Download</a
                                                >
                                                {/* edit report */}
                                                <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; editReport(report.id) }}
                                                ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                >
                                                {/* delete report */}
                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; deleteReport(report.id) }}
                                                ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                                >
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {/* card footer */}
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="col-sm-6">
                        {totalReports > 0 && (
                            <div className="text-muted">
                                Showing <span>{reportList.length}</span> out of <span>{totalReports}</span> reports
                            </div>
                        )}
                    </div>

                    <div className="col-sm-6 d-flex justify-content-end">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(page - 1)}>
                                        <i className="tf-icon mdi mdi-chevron-double-left"></i>
                                    </a>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                        <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                    <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(page + 1)}>
                                        <i className="tf-icon mdi mdi-chevron-double-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>

        </div>
    );
};


// Edit Report
const EditReport = ({ currentView, setCurrentView, getMessage, setMessage, updatedReport, setUpdatedReport,
    uniqueBuyerListRequirement, requirementList, getRequirementList }) => {

    // submitUpdateReportForm
    const submitUpdateReportForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('updateReportForm');
        const formData = new FormData(form);

        // formDataObject is a plain object with key-value pairs
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('/development/edit-report', {
            method: 'PUT',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log('Redirecting to report list page');
                    // redirect to report list page
                    setCurrentView('manage-report'); // Update currentView
                } else {
                    console.log('Failed to update report. Status:', data.status);
                }
                setMessage(data.message); // Update message              
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Internal Server Error'); // Use a generic error message here
            });
    };


    return (
        <div className="col-xxl">
            {getMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {getMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Edit Report</h5>
                </div>
                <div className="card-body">
                    <form method="POST" action="" id="updateReportForm" autoComplete="off">
                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            {/* report id */}
                            <input type="hidden" name="id" value={updatedReport.id} />
                            <label className="col-sm-2 col-form-label" for="buyer">Buyer</label>
                            <div className="col-sm-4">
                                <select id="buyer" name="buyer" className="form-select"
                                    onChange={(e) => {
                                        e.preventDefault; getRequirementList(e.target.value);
                                        setUpdatedReport({ ...updatedReport, buyer: e.target.value })
                                    }}
                                    value={updatedReport.buyer}
                                >
                                    <option>--</option>
                                    {uniqueBuyerListRequirement.map((buyer, index) => (
                                        <option
                                            key={index}
                                            value={buyer.buyer__id}
                                        >
                                            {buyer.buyer__name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <!-- Requirements --> */}
                            <label className="col-sm-2 col-form-label" for="requirement">Requirements</label>
                            <div className="col-sm-4">
                                <select id="requirement" name="requirement" className="form-select"
                                    defaultValue={updatedReport.requirement_id}
                                    onChange={(e) => { e.preventDefault; setUpdatedReport({ ...updatedReport, requirement_id: e.target.value }) }}
                                >
                                    {requirementList.length === 0 ? (
                                        <option key={updatedReport.requirement_id} value={updatedReport.requirement_id}>{updatedReport.requirement_label}</option>
                                    ) : (
                                        requirementList.map((requirement, index) => (
                                            <option key={index} value={requirement.id}>{requirement.requirement_label} </option>
                                        ))
                                    )}

                                </select>
                            </div>
                        </div>
                        {/* <!-- Date --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="receive_date">Receive Date</label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" name="receive_date" id="receive_date"
                                    value={updatedReport.receive_date}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, receive_date: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="report_date">Report Date</label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" name="report_date" id="report_date"
                                    value={updatedReport.report_date}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, report_date: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Style --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="style">Style</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="style" id="style" placeholder="Style"
                                    value={updatedReport.style}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, style: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Color --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="color">Color</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="color" id="color" placeholder="Color"
                                    value={updatedReport.color}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, color: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="sample_type">Sample Type</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="sample_type" id="sample_type" placeholder="Sample Type"
                                    value={updatedReport.sample_type}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, sample_type: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Fabric Reference --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="fab_ref">Fabric Reference</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="fab_ref" id="fab_ref" placeholder="Fabric Reference"
                                    value={updatedReport.fab_ref}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, fab_ref: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="fab_supplier">Supplier</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="fab_supplier" id="fab_supplier" placeholder="Supplier"
                                    value={updatedReport.fab_supplier}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, fab_supplier: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* <!-- Rubbing --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="dry_rubbing">Dry Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="dry_rubbing" id="dry_rubbing" placeholder="Dry Rubbing"
                                    value={updatedReport.dry_rubbing}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, dry_rubbing: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wet_rubbing">Wet Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wet_rubbing" id="wet_rubbing" placeholder="Wet Rubbing"
                                    value={updatedReport.wet_rubbing}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, wet_rubbing: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Raw Tear --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="raw_tear_warp">Raw Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="raw_tear_warp" id="raw_tear_warp" placeholder="Raw Tear Warp"
                                    value={updatedReport.raw_tear_warp}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, raw_tear_warp: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="raw_tear_weft">Raw Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="raw_tear_weft" id="raw_tear_weft" placeholder="Raw Tear Warp"
                                    value={updatedReport.raw_tear_weft}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, raw_tear_weft: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Wash Tear --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="wash_tear_warp">Wash Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_warp" id="wash_tear_warp" placeholder="Wash Tear Warp"
                                    value={updatedReport.wash_tear_warp}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, wash_tear_warp: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wash_tear_weft">Wash Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="wash_tear_weft" id="wash_tear_weft" placeholder="Wash Tear Weft"
                                    value={updatedReport.wash_tear_weft}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, wash_tear_weft: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Tensile --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="tensile_warp">Tensile Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_warp" id="tensile_warp" placeholder="Tensile Warp"
                                    value={updatedReport.tensile_warp}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, tensile_warp: e.target.value })}
                                />
                            </div>
                            <label className="col-sm-2 col-form-label" for="tensile_weft">Tensile Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="tensile_weft" id="tensile_weft" placeholder="Tensile Weft"
                                    value={updatedReport.tensile_weft}
                                    onChange={(e) => setUpdatedReport({ ...updatedReport, tensile_weft: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* <!-- Save --> */}
                        <div className="row justify-content-end">
                            <div className="col-sm-10">
                                <button type="submit" onClick={submitUpdateReportForm} className="btn btn-primary m-2">Update</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};


// Footer
const Footer = () => {
    return (
        <dev>
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl">
                    <div
                        className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                        <div className="text-body mb-2 mb-md-0">
                            ©2023, made with <span className="text-danger"><i className="tf-icons mdi mdi-heart"></i></span> by: <a href="https://github.com/shamimhcp1" className="footer-link me-3" target="_blank">Shamim Hossain</a>

                        </div>
                        <div className="text-body d-lg-inline-block">
                            Theme design by:
                            <a href="https://themeselection.com" target="_blank" className="footer-link fw-medium"
                            >ThemeSelection</a
                            >
                        </div>
                    </div>
                </div>
            </footer>
        </dev>
    );
};

{/* Search Input */}
const SearchInput = ({ searchQuery, setSearchQuery, currentView, setCurrentView }) => {
   
    return (
      <div className="navbar-nav align-items-center">
        <div className="nav-item d-flex align-items-center">
            <i className="mdi mdi-magnify mdi-24px lh-0"></i>
            <input
                type="text"
                className="form-control border-0 shadow-none bg-body"
                placeholder="Search ..."
                aria-label="Search ..."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setCurrentView('search-result');} }
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
            />
        </div>
      </div>
    );
};

{/* Search Result */}
const SearchResult = ({ currentView, setCurrentView, searchQuery,
    getMessage, setMessage, deleteReport, viewReport, downloadReport, editReport
    }) => {

    const [reportList, setReportList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalReports, setTotalReports] = React.useState(0);
    const [limit, setLimit] = React.useState(4);
    
    React.useEffect(() => {
        fetch(`/development/search?page=${page}&limit=${limit}&query=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setReportList(data.searchResult);
                    setTotalPages(data.totalPages);
                    setTotalReports(data.totalReports);
                    setCurrentView('search-result');
                }
                else {
                    console.log('Failed to fetch search result. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }
            );
    }, [searchQuery, page, limit]);

    // handlePageChange
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

        return (
            <div className="col-md-12 col-lg-12">
                {getMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> {getMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                <div className="card">
                    <h5 className="card-header">Your search result for : <strong>{searchQuery}</strong> </h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-truncate">#</th>
                                    <th className="text-truncate">Buyer</th>
                                    <th className="text-truncate">Style</th>
                                    <th className="text-truncate">Color</th>
                                    <th className="text-truncate">Result</th>
                                    <th className="text-truncate">Create Date</th>
                                    <th className="text-truncate">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* display loading bar before reportList show */}
                                {reportList.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {reportList.map((report, index) => (
                                    <tr key={index}>
                                        <td className="text-truncate">{index + 1}</td>
                                        <td className="text-truncate">{report.buyer_name}</td>
                                        <td className="text-truncate">{report.style}</td>
                                        <td className="text-truncate">{report.color}</td>
                                        {/* get result, if result is ok green, if result not ok red, else warning */}
                                        <td>
                                            {report.result === 'Result is Ok' ? (
                                                <span className="badge bg-label-success rounded-pill">Result is Ok</span>
                                            ) : report.result === 'Result Not Ok' ? (
                                                <span className="badge bg-label-danger rounded-pill">Result Not OK</span>
                                            ) : (
                                                <span className="badge bg-label-warning rounded-pill">See Data Sheet</span>
                                            )}
                                        </td>
                                        <td className="text-truncate">{report.create_date}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    {/* view report */}
                                                    <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; viewReport(report.id) }}
                                                    ><i className="mdi mdi-eye-outline me-1"></i> View</a
                                                    >
                                                    {/* download report  */}
                                                    <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; downloadReport(report.id) }}
                                                    ><i className="mdi mdi-download-outline me-1"></i> Download</a
                                                    >
                                                    {/* edit report */}
                                                    <a className="dropdown-item" href="javascript:void(0);" onClick={(e) => { e.preventDefault; editReport(report.id) }}
                                                    ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                    >
                                                    {/* delete report */}
                                                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault; deleteReport(report.id) }}
                                                    ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
    
                            </tbody>
                        </table>
                    </div>
                    {/* card footer */}
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <div className="col-sm-6">
                            {totalReports > 0 && (
                                <div className="text-muted">
                                    Showing <span>{reportList.length}</span> out of <span>{totalReports}</span> reports
                                </div>
                            )}
                        </div>
    
                        <div className="col-sm-6 d-flex justify-content-end">
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(page - 1)}>
                                            <i className="tf-icon mdi mdi-chevron-double-left"></i>
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                            <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(index + 1)}>
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                        <a className="page-link" href="javascript:void(0);" onClick={() => handlePageChange(page + 1)}>
                                            <i className="tf-icon mdi mdi-chevron-double-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
    
                </div>
    
            </div>
    );
};



const Sidebar = ({ currentView, handleMenuClick, handleMainMenuClick, activeMainMenuItem, activeMenuItem, user, setUser }) => {

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme open">
            <div className="app-brand demo">
                <a href="/development" className="app-brand-link">
                    <span className="app-brand-text demo menu-text fw-semibold ms-2">Textile-Lab</span>
                </a>

                <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto">
                    <i className="mdi menu-toggle-icon d-xl-block align-middle mdi-20px"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                {/* <!-- Dashboard --> */}
                <li className={`menu-item ${activeMenuItem === 'dashboard' || currentView === 'dashboard' ? 'active open' : ''}`}>
                    <a
                        href="javascript:void(0);"
                        className="menu-link"
                        onClick={() => handleMenuClick('dashboard')}>
                        <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
                        <div data-i18n="Email">Dashboard</div>
                    </a>
                </li>
                {/* <!-- Buyers --> */}
                {user.is_superuser && (
                    <li className={`menu-item ${activeMainMenuItem === 'buyer' ? 'active open' : ''}`}>
                        <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMainMenuClick('buyer')}>
                            <i className="menu-icon tf-icons mdi mdi-star-outline"></i>
                            <div data-i18n="Authentications">Buyers</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={`menu-item ${activeMenuItem === 'create-buyer' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('create-buyer'); }}>
                                    <div data-i18n="Basic">Create</div>
                                </a>
                            </li>
                            <li className={`menu-item ${activeMenuItem === 'manage-buyer' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-buyer'); }}>
                                    <div data-i18n="Basic">Manage Buyers</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                )}
                {/* <!-- Requirements --> */}
                {user.is_superuser && (
                    <li className={`menu-item ${activeMainMenuItem === 'requirement' ? 'active open' : ''}`}>
                        <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMainMenuClick('requirement')}>
                            <i className="menu-icon tf-icons mdi mdi-folder-wrench-outline"></i>
                            <div data-i18n="Misc">Requirements</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={`menu-item ${activeMenuItem === 'create-requirement' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('create-requirement'); }}>
                                    <div data-i18n="Error">Create</div>
                                </a>
                            </li>
                            <li className={`menu-item ${activeMenuItem === 'manage-requirement' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-requirement'); }}>
                                    <div data-i18n="Under Maintenance">Manage Requirements</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                )}

                {/* <!-- Reports --> */}
                {user.is_staff && (
                    <li className={`menu-item ${activeMainMenuItem === 'report' ? 'active open' : ''}`}>
                        <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMainMenuClick('report')}>
                            <i className="menu-icon tf-icons mdi mdi-form-select"></i>
                            <div data-i18n="Misc">Reports</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={`menu-item ${activeMenuItem === 'create-report' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('create-report'); }}>
                                    <div data-i18n="Error">Create</div>
                                </a>
                            </li>
                            <li className={`menu-item ${activeMenuItem === 'manage-report' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-report'); }}>
                                    <div data-i18n="Under Maintenance">Manage Reports</div>
                                </a>
                            </li>

                        </ul>
                    </li>
                )}

                {/* <!-- Users --> */}
                {user.is_superuser && (
                    <li className={`menu-item ${activeMainMenuItem === 'user' ? 'active open' : ''}`}>
                        <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMainMenuClick('user')}>
                            <i className="menu-icon tf-icons mdi mdi-account-outline"></i>
                            <div data-i18n="Account Settings">Users</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={`menu-item ${activeMenuItem === 'create-user' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('create-user'); }}>
                                    <div data-i18n="Account">Create</div>
                                </a>
                            </li>
                            <li className={`menu-item ${activeMenuItem === 'manage-user' ? 'active' : ''}`}>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); handleMenuClick('manage-user'); }}>
                                    <div data-i18n="Notifications">Manage Users</div>
                                </a>
                            </li>

                        </ul>
                    </li>
                )}


                {/* <!-- Misc --> */}
            </ul>
        </aside>
    );
};

const Navbar = ({ currentView, setCurrentView, handleMenuClick, user, setUser, searchQuery, setSearchQuery  }) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true); // Add this line

    const toggleSidebar = (e) => {
        e.stopPropagation(); // Stop the click event propagation
        setIsSidebarExpanded(!isSidebarExpanded);
    };
    // to apply/remove the class to the html tag based on the sidebar state
    React.useEffect(() => {
        const htmlTag = document.querySelector('html');
        if (isSidebarExpanded) {
            htmlTag.classList.add('layout-menu-expanded');
        } else {
            htmlTag.classList.remove('layout-menu-expanded');
        }
    }, [isSidebarExpanded]);


    // close the sidebar when clicking outside of it
    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            const layoutMenu = document.getElementById('layout-menu');
            if (layoutMenu && !layoutMenu.contains(e.target)) {
                setIsSidebarExpanded(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts


    return (
        <div>
            {/* show a warning div that this account is not staff */}
            <div className="alert alert-danger alert-dismissible fade show" role="alert"
                style={{ display: !user.is_staff ? 'block' : 'none' }}
            >
                <strong>Warning!</strong> This account is not "staff account". Please contact with admin.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)"
                        onClick={toggleSidebar}
                    >
                        <i className="mdi mdi-menu mdi-24px"></i>
                    </a>
                </div>

                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    {/* <!-- Search --> */}
                    <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentView={currentView} setCurrentView={setCurrentView} />
                    {/* <!-- /Search --> */}

                    <ul className="navbar-nav flex-row align-items-center ms-auto">

                        {/* <!-- User --> */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a
                                className="nav-link dropdown-toggle hide-arrow p-0"
                                href="javascript:void(0);"
                                data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img src="/static/development/assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end mt-3 py-2">
                                <li>
                                    <a className="dropdown-item pb-2 mb-1" href="#" onClick={(e) => { e.preventDefault(); }}>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2 pe-1">
                                                <div className="avatar avatar-online">
                                                    <img src="/static/development/assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">
                                                    {user.username}
                                                </h6>
                                                {/* user role */}
                                                <small className="text-muted">
                                                    {user.is_superuser && 'Superuser'}
                                                    {!user.is_superuser && user.is_staff && 'Staff'}
                                                    {!user.is_superuser && !user.is_staff && 'User'}
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider my-1"></div>
                                </li>

                                <li>
                                    <a className="dropdown-item" href="#"
                                        onClick={(e) => { e.preventDefault(); handleMenuClick('change-password'); }}>
                                        <i className="mdi mdi-key-outline me-1 mdi-20px"></i>
                                        <span className="align-middle">Change Password</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider my-1"></div>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/development/logout">
                                        <i className="mdi mdi-power me-1 mdi-20px"></i>
                                        <span className="align-middle">Log Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/* <!--/ User --> */}
                    </ul>
                </div>
            </nav>
        </div>
    );
};


const App = () => {
    // keep updated buyer in a react state veriable
    const [getMessage, setMessage] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [activeMenuItem, setActiveMenuItem] = React.useState(null);
    const [activeMainMenuItem, setActiveMainMenuItem] = React.useState(null);
    
    // search
    const [searchQuery, setSearchQuery] = React.useState('');
    console.log(searchQuery)
    
    // setUpdatedUser
    const [updatedUser, setUpdatedUser] = React.useState({
        username: '',
        email: '',
        password: '',
        is_superuser: '',
        is_staff: '',
        is_active: '',
    });
    // get logged in user details
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        fetch('/development/get-user-details')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    setUser(data.user);
                } else {
                    console.log('Failed to fetch user details. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const [uniqueBuyerListRequirement, setUniqueBuyerListRequirement] = React.useState([]);
    // fetch buyer list from database url manage-buyer
    React.useEffect(() => {
        fetch('/development/buyer-list-requirement')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    // Assuming data.buyerList is an array of objects with id and name
                    setUniqueBuyerListRequirement(data.buyerList);
                } else {
                    console.log('Failed to fetch buyer list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const [requirementList, setRequirementList] = React.useState([]);
    // getRequirementList by buyer id, url get-requirement-by-buyer
    const getRequirementList = (buyerId) => {
        fetch(`/development/get-requirement-by-buyer?id=${buyerId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    // Assuming data.requirementList is an array of objects with id and name
                    setRequirementList(data.requirementList);
                } else {
                    console.log('Failed to fetch requirement list. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // setUpdatedReport
    const [updatedReport, setUpdatedReport] = React.useState({
        buyer: '',
        buyer_name: '',
        requirement: '',
        requirement_label: '',
        receive_date: '',
        report_date: '',
        style: '',
        color: '',
        sample_type: '',
        fab_ref: '',
        fab_supplier: '',
        dry_rubbing: '',
        wet_rubbing: '',
        raw_tear_warp: '',
        raw_tear_weft: '',
        wash_tear_warp: '',
        wash_tear_weft: '',
        tensile_warp: '',
        tensile_weft: '',
        result: '',
        create_date: '',
    });

    // keep updated buyer in a react state veriable
    const [updatedBuyer, setUpdatedBuyer] = React.useState({
        name: '',
        is_active: '',
    });

    // setUpdateRequirement
    const [updatedRequirement, setUpdatedRequirement] = React.useState({
        buyer: '',
        buyer_name: '',
        requirement_label: '',
        is_active: '',
        dry_rubbing: '',
        wet_rubbing: '',
        rubbing_method: '',
        rubbing_text: '',
        wash_tear_warp: '',
        wash_tear_weft: '',
        tear_method: '',
        tear_text: '',
        tensile_warp: '',
        tensile_weft: '',
        tensile_method: '',
        tensile_text: '',
    });

    // useEffect to remove the message after 5 seconds
    setTimeout(() => {
        setMessage(null);
    }, 5000);


    const handleMenuClick = (view) => {
        setCurrentView(view); // Update currentView
        window.history.pushState(null, '', view); // Update the URL
        console.log('CurrentView: ' + view);
        setActiveMenuItem(activeMenuItem === view ? null : view);
    };
    
    window.addEventListener('popstate', (event) => {
        // Handle back/forward navigation here
        // You can access the current URL from event.state or window.location.pathname
        let path = window.location.pathname
        let [, view] = path.split("/development/") // get the view from url
        setCurrentView(view); // Update currentView
    });

    const handleMainMenuClick = (view) => {
        setActiveMainMenuItem(activeMainMenuItem === view ? null : view);
    };

    // deleteReport
    const deleteReport = (reportId) => {
        fetch(`/development/delete-report?id=${reportId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Report deleted successfully');
                    // remove the deleted report from reportList
                    const newReportList = reportList.filter(report => report.id !== reportId);
                    setReportList(newReportList);
                    setMessage(data.message);
                } else {
                    console.log('Failed to delete report. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // viewReport
    const viewReport = (reportId) => {
        window.open(`/development/view-report?id=${reportId}`, '_blank');
    };

    // downloadReport
    const downloadReport = (reportId) => {
        window.open(`/development/download-report?id=${reportId}`, '_blank');
    };

    // editReport
    const editReport = (reportId) => {
        fetch(`/development/edit-report?id=${reportId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Redirecting to edit report page');
                    // redirect to edit report page
                    setCurrentView('edit-report'); // Update currentView
                    setUpdatedReport(data.report); // Update updatedReport
                } else {
                    console.log('Failed to fetch report. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {/* <!-- Layout wrapper --> */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* <!-- Menu --> */}
                    <Sidebar currentView={currentView} setCurrentView={setCurrentView}
                        handleMenuClick={handleMenuClick} handleMainMenuClick={handleMainMenuClick}
                        activeMenuItem={activeMenuItem} activeMainMenuItem={activeMainMenuItem} 
                        user={user} setUser={setUser} 
                        getMessage={getMessage} setMessage={setMessage} 
                        />
                    {/* <!-- / Menu --> */}

                    {/* <!-- Layout container --> */}
                    <div className="layout-page">

                        {/* <!-- Navbar --> */}
                        <Navbar handleMenuClick={handleMenuClick} user={user} setUser={setUser} 
                            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
                            currentView={currentView} setCurrentView={setCurrentView} />
                        {/* <!-- / Navbar --> */}

                        {/* <!-- Content wrapper --> */}
                        <div className="content-wrapper">
                            {/* <!-- Content --> */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row gy-4">
                                    {currentView === 'dashboard' && (
                                        <>
                                            <DashboardWidget handleMenuClick={handleMenuClick} handleMainMenuClick={handleMainMenuClick}
                                                user={user} setUser={setUser} />
                                        </>
                                    )}

                                    {currentView === 'create-buyer' && <CreateBuyer currentView={currentView} setCurrentView={setCurrentView}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} getMessage={getMessage} setMessage={setMessage} />}

                                    {currentView === 'manage-buyer' && <ManageBuyer getMessage={getMessage} setMessage={setMessage} currentView={currentView} setCurrentView={setCurrentView}
                                        updatedBuyer={updatedBuyer} setUpdatedBuyer={setUpdatedBuyer} />}

                                    {currentView === 'edit-buyer' && <EditBuyer currentView={currentView} setCurrentView={setCurrentView}
                                        updatedBuyer={updatedBuyer} setUpdatedBuyer={setUpdatedBuyer} getMessage={getMessage} setMessage={setMessage} />}

                                    {currentView === 'create-requirement' && <CreateRequirement currentView={currentView} setCurrentView={setCurrentView}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} getMessage={getMessage} setMessage={setMessage} />}

                                    {currentView === 'manage-requirement' && <ManageRequirement getMessage={getMessage} setMessage={setMessage}
                                        currentView={currentView} setCurrentView={setCurrentView} updatedRequirement={updatedRequirement} setUpdatedRequirement={setUpdatedRequirement} />}

                                    {currentView === 'edit-requirement' && <EditRequirement currentView={currentView} setCurrentView={setCurrentView}
                                        updatedRequirement={updatedRequirement} setUpdatedRequirement={setUpdatedRequirement} getMessage={getMessage} setMessage={setMessage} />}

                                    {currentView === 'create-report' && <CreateReport currentView={currentView} setCurrentView={setCurrentView} getMessage={getMessage} setMessage={setMessage}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}
                                        uniqueBuyerListRequirement={uniqueBuyerListRequirement} setUniqueBuyerListRequirement={setUniqueBuyerListRequirement}
                                        requirementList={requirementList} setRequirementList={setRequirementList} getRequirementList={getRequirementList} />}

                                    {currentView === 'manage-report' && <ManageReport currentView={currentView} setCurrentView={setCurrentView} getMessage={getMessage} setMessage={setMessage}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} updatedReport={updatedReport} setUpdatedReport={setUpdatedReport} 
                                        deleteReport={deleteReport} viewReport={viewReport} downloadReport={downloadReport} editReport={editReport}
                                        />}

                                    {currentView === 'edit-report' && <EditReport currentView={currentView} setCurrentView={setCurrentView} getMessage={getMessage} setMessage={setMessage}
                                        updatedReport={updatedReport} setUpdatedReport={setUpdatedReport}
                                        uniqueBuyerListRequirement={uniqueBuyerListRequirement} setUniqueBuyerListRequirement={setUniqueBuyerListRequirement}
                                        requirementList={requirementList} setRequirementList={setRequirementList} getRequirementList={getRequirementList} />}

                                    {currentView === 'create-user' && <CreateUser currentView={currentView} setCurrentView={setCurrentView} getMessage={getMessage} setMessage={setMessage}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />}

                                    {currentView === 'manage-user' && <ManageUser currentView={currentView} setCurrentView={setCurrentView} getMessage={getMessage} setMessage={setMessage}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}
                                        updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} />}

                                    {currentView === 'change-password' && <ChangePassword
                                        getMessage={getMessage} setMessage={setMessage}
                                        currentView={currentView} setCurrentView={setCurrentView} />}

                                    {currentView === 'edit-user' && <EditUser
                                        getMessage={getMessage} setMessage={setMessage}
                                        currentView={currentView} setCurrentView={setCurrentView}
                                        updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}
                                    />}

                                    {currentView === 'search-result' && <SearchResult
                                        getMessage={getMessage} setMessage={setMessage}
                                        currentView={currentView} setCurrentView={setCurrentView}
                                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                        deleteReport={deleteReport} 
                                        viewReport={viewReport} downloadReport={downloadReport}
                                        editReport={editReport}
                                    />}

                                </div>
                            </div>
                            {/* <!-- / Content --> */}

                            {/* <!-- Footer --> */}
                            <Footer />
                            {/* <!-- / Footer --> */}

                            <div className="content-backdrop fade"></div>
                        </div>
                        {/* <!-- Content wrapper --> */}
                    </div>
                    {/* <!-- / Layout page --> */}
                </div>

                {/* <!-- Overlay --> */}
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
            {/* <!-- / Layout wrapper --> */}

        </div>
    );
}

// Function to get CSRF token from cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

ReactDOM.render(<App />, app);