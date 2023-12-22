const app = document.getElementById('app');

const CreateUser = () => {
    return (
        <div class="col-md-12 col-lg-6">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Add User</h5>
                    <small class="text-muted float-end">Tusuka-Development</small>
                </div>
                <div class="card-body">
                    <form action="{% url 'register' %}" method="POST">
                        <div class="form-floating form-floating-outline mb-4">
                            <select id="role" class="form-select" name="role">
                                <option>-Select Role-</option>
                                <option value="incharge">Incharge</option>
                                <option value="coordinator">Coordinator</option>
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
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ManageUser = () => {
    return (
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <h5 class="card-header">Manage Users</h5>
                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead class="table-light">
                            <tr>
                                <th class="text-truncate">User</th>
                                <th class="text-truncate">Email</th>
                                <th class="text-truncate">Role</th>
                                <th class="text-truncate">Status</th>
                                <th class="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="avatar avatar-sm me-3">
                                            <img src="/static/development/assets/img/avatars/1.png" alt="Avatar" class="rounded-circle" />
                                        </div>
                                        <div>
                                            <h6 class="mb-0 text-truncate">Shamim Hossain</h6>
                                            <small class="text-truncate">@user_a</small>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-truncate">shamimhcp@gmail.com</td>
                                <td class="text-truncate">
                                    superuser
                                </td>
                                <td>
                                    <span class="badge bg-label-success rounded-pill">Active</span>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i class="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="javascript:void(0);"
                                            ><i class="mdi mdi-pencil-outline me-1"></i> Edit</a
                                            >
                                            <a class="dropdown-item" href="javascript:void(0);"
                                            ><i class="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ChangePassword = () => {
    return (
        <div class="col-md-12 col-lg-6">
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Change Password</h5>
                    <small class="text-muted float-end">Tusuka-Development</small>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="basic-default-fullname" placeholder="Current Password" />
                            <label for="basic-default-fullname">Current Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="basic-default-fullname" placeholder="New Password" />
                            <label for="basic-default-fullname">New Password</label>
                        </div>
                        <div class="form-floating form-floating-outline mb-4">
                            <input type="password" class="form-control" id="basic-default-fullname" placeholder="Confirm New Password" />
                            <label for="basic-default-fullname">Confirm New Password</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ProfileView = () => {
    return (
        <div class="col-md-12 col-lg-12">
            <div class="card mb-4">
                <h4 class="card-header">Profile Details</h4>
                {/* <!-- Account --> */}
                <div class="card-body">
                    <div class="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                            src="/static/development/assets/img/avatars/1.png"
                            alt="user-avatar"
                            class="d-block w-px-120 h-px-120 rounded"
                            id="uploadedAvatar" />
                        <div class="button-wrapper">
                            <label for="upload" class="btn btn-primary me-2 mb-3" tabindex="0">
                                <span class="d-none d-sm-block">Upload new photo</span>
                                <i class="mdi mdi-tray-arrow-up d-block d-sm-none"></i>
                                <input
                                    type="file"
                                    id="upload"
                                    class="account-file-input"
                                    hidden
                                    accept="image/png, image/jpeg" />
                            </label>
                            <button type="button" class="btn btn-outline-danger account-image-reset mb-3">
                                <i class="mdi mdi-reload d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Reset</span>
                            </button>

                            <div class="text-muted small">Allowed JPG, GIF or PNG. Max size of 800K</div>
                        </div>
                    </div>
                </div>
                <div class="card-body pt-2 mt-1">
                    <form id="formAccountSettings" method="POST" onsubmit="return false">
                        <div class="row mt-2 gy-4">
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value="Shamim"
                                        autofocus />
                                    <label for="firstName">First Name</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input class="form-control" type="text" name="lastName" id="lastName" value="Hossain" />
                                    <label for="lastName">Last Name</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="email"
                                        name="email"
                                        value="shamimhcp@gmail.com"
                                        placeholder="shamimhcp@gmail.com" />
                                    <label for="email">E-mail</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="username"
                                        name="username"
                                        value="user_a" />
                                    <label for="organization">Username</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group input-group-merge">
                                    <span class="input-group-text">BD (+880)</span>
                                    <div class="form-floating form-floating-outline">
                                        <input
                                            type="text"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            class="form-control"
                                            placeholder="18123456789" />
                                        <label for="phoneNumber">Mobile Number</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="address"
                                        name="address"
                                        placeholder="Address" />
                                    <label for="address">Address</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Dhaka" />
                                    <label for="state">City</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="zipCode"
                                        name="zipCode"
                                        placeholder="231465"
                                        maxlength="6" />
                                    <label for="zipCode">Zip Code</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <select id="country" class="select2 form-select">
                                        <option value="">Select</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="Canada">Canada</option>
                                        <option value="China">China</option>
                                        <option value="France">France</option>
                                        <option value="Germany">Germany</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Korea">Korea, Republic of</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Russia">Russian Federation</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                    </select>
                                    <label for="country">Country</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <select id="language" class="select2 form-select">
                                        <option value="">Select Language</option>
                                        <option value="en">English</option>
                                        <option value="fr">Bengali</option>
                                    </select>
                                    <label for="language">Language</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <select id="timeZones" class="select2 form-select">
                                        <option value="">Select Timezone</option>

                                        <option value="-12">(GMT-12:00) International Date Line West</option>
                                        <option value="-11">(GMT-11:00) Midway Island, Samoa</option>
                                        <option value="-10">(GMT-10:00) Hawaii</option>
                                        <option value="-9">(GMT-09:00) Alaska</option>
                                        <option value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                                        <option value="-8">(GMT-08:00) Tijuana, Baja California</option>
                                        <option value="-7">(GMT-07:00) Arizona</option>
                                        <option value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                        <option value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
                                        <option value="-6">(GMT-06:00) Central America</option>
                                        <option value="-6">(GMT-06:00) Central Time (US & Canada)</option>
                                        <option value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                        <option value="-6">(GMT-06:00) Saskatchewan</option>
                                        <option value="+6">(GMT+06:00) Asia, Dhaka</option>
                                        <option value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                        <option value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
                                        <option value="-5">(GMT-05:00) Indiana (East)</option>
                                        <option value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
                                        <option value="-4">(GMT-04:00) Caracas, La Paz</option>

                                    </select>
                                    <label for="timeZones">Timezone</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating form-floating-outline">
                                    <select id="currency" class="select2 form-select">
                                        <option value="">Select Currency</option>
                                        <option value="usd">BDT</option>
                                        <option value="usd">USD</option>
                                        <option value="euro">Euro</option>
                                        <option value="pound">Pound</option>
                                    </select>
                                    <label for="currency">Currency</label>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="submit" class="btn btn-primary me-2">Save changes</button>
                            <button type="reset" class="btn btn-outline-secondary">Reset</button>
                        </div>
                    </form>
                </div>
                {/* <!-- /Account --> */}
            </div>
        </div>
    );
};

const ReportCountWidget = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title m-0 me-2">Development Reports</h5>
                        <div className="dropdown">
                            <button
                                className="btn p-0"
                                type="button"
                                id="transactionID"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="mdi mdi-dots-vertical mdi-24px"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                                <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                                <a className="dropdown-item" href="javascript:void(0);">Share</a>
                                <a className="dropdown-item" href="javascript:void(0);">Update</a>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3"><span className="fw-medium">Total 98 reports created</span> 😎 today</p>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-3 col-6">
                            <div className="d-flex align-items-center">
                                <div className="avatar">
                                    <div className="avatar-initial bg-primary rounded shadow">
                                        <span className="mdi mdi-form-select"></span>
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <div className="small mb-1">Reports</div>
                                    <h5 className="mb-0">98</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="d-flex align-items-center">
                                <div className="avatar">
                                    <div className="avatar-initial bg-warning rounded shadow">
                                        <span className="mdi mdi-star-circle"></span>
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <div className="small mb-1">Buyers</div>
                                    <h5 className="mb-0">7</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="d-flex align-items-center">
                                <div className="avatar">
                                    <div className="avatar-initial bg-success rounded shadow">
                                        <span className="mdi mdi-check-circle"></span>
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <div className="small mb-1">Result is Ok</div>
                                    <h5 className="mb-0">45</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="d-flex align-items-center">
                                <div className="avatar">
                                    <div className="avatar-initial bg-danger rounded shadow">
                                        <span className="mdi mdi-minus-circle"></span>
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <div className="small mb-1">Result Not Ok</div>
                                    <h5 className="mb-0">53</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecentReportWidget = () => {
    return (
        <div className="col-12">
            <div className="card">
                <h5 className="card-header">Recent Reports</h5>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="text-truncate">#</th>
                                <th className="text-truncate">Buyer</th>
                                <th className="text-truncate">Style</th>
                                <th className="text-truncate">Color</th>
                                <th className="text-truncate">Sample Type</th>
                                <th className="text-truncate">Fab Ref</th>
                                <th className="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-truncate">1</td>
                                <td className="text-truncate">Group Dynamite</td>
                                <td className="text-truncate">100089151</td>
                                <td className="text-truncate">Blue</td>
                                <td className="text-truncate">1st Fit</td>
                                <td className="text-truncate">3293HRF-WECO-OCS25</td>
                                <td>
                                    <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                            >
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

    
const CreateBuyer = ({currentView, setCurrentView, setActiveMenuItem, getMessage, setMessage}) => {

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
                console.log('Success:', data);
                if (data.status === 'success') {
                    console.log('Redirecting to buyer list page');
                    // redirect to buyer list page
                    setCurrentView('manage-buyer'); // Update currentView
                    setActiveMenuItem('manage-buyer')
                    setMessage(data.message)
                } else {
                    console.log('Failed to create buyer. Status:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="col-md-12 col-lg-6">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Create Buyer</h5>
                    <small className="text-muted float-end">Tusuka-Development</small>
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


const ManageBuyer = ({getMessage, setMessage}) => {
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
                                                <a className="dropdown-item" href="#"
                                                ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                                >
                                                <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault; deleteBuyer(buyer.id)}}
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

const CreateRequirement = () => {
    return (
        <div className="col-xxl">
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Add Requirements</h5>
                    <small className="text-muted float-end">Tusuka-Development</small>
                </div>
                <div className="card-body">
                    <form method="post" action="">

                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="buyer-name">Buyer</label>
                            <div className="col-sm-4">
                                <select id="buyer-name" className="form-select">
                                    <option>--</option>
                                    <option value="LPP">LPP</option>
                                    <option value="Group Dynamite">Group Dynamite</option>
                                </select>
                            </div>
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Label" />
                            </div>
                        </div>


                        {/* <!-- Rubbing --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="dry-rubbing">Dry Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="dry-rubbing" placeholder="Dry Rubbing" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wet-rubbing">Wet Rubbing</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="wet-rubbing" placeholder="Wet Rubbing" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Rubbing Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Rubbing  Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Rubbing Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Rubbing  Text" />
                            </div>
                        </div>

                        {/* <!-- Wash Tear --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="wash-tear-warp">Wash Tear Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="wash-tear-warp" placeholder="Wash Tear Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="wash-tear-weft">Wash Tear Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="wash-tear-weft" placeholder="Wash Tear Weft" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Tear Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Tear Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Tear Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Tear Text" />
                            </div>
                        </div>
                        {/* <!-- Tensile --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="tensile-warp">Tensile Warp</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="tensile-warp" placeholder="Tensile Warp" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="tensile-weft">Tensile Weft</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="tensile-weft" placeholder="Tensile Weft" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Tensile Method</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Tensile Method" />
                            </div>
                            <label className="col-sm-2 col-form-label" for="basic-default-name">Tensile Text</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="basic-default-name" placeholder="Tensile Text" />
                            </div>
                        </div>
                        {/* <!-- Save --> */}
                        <div className="row justify-content-end">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

const ManageRequirement = () => {
    return (
        <div className="col-md-12 col-lg-8">
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
                            <tr>
                                <td className="text-truncate">1</td>
                                <td className="text-truncate">LPP</td>
                                <td className="text-truncate">1st</td>
                                <td>
                                    <span className="badge bg-label-success rounded-pill">Active</span>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                            >
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const CreateReport = () => {
    return (
        <div className="col-xxl">
            <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Create Report</h5>
                    <small className="text-muted float-end">Tusuka-Development</small>
                </div>
                <div className="card-body">
                    <form method="post" action="{% url 'create-report' %}">
                        {/* <!-- Buyer --> */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" for="buyer">Buyer</label>
                            <div className="col-sm-4">
                                <select id="buyer" name="buyer" className="form-select">
                                    <option>--</option>
                                    <option value="LPP">LPP</option>
                                    <option value="Group Dynamite">Group Dynamite</option>
                                    <option value="Bonobo">Bonobo</option>
                                </select>
                            </div>
                            {/* <!-- Requirements --> */}
                            <label className="col-sm-2 col-form-label" for="requirement">Requirements</label>
                            <div className="col-sm-4">
                                <select id="requirement" name="requirement" className="form-select">
                                    <option>--</option>
                                    <option value="Lt/Mid">Lt/Mid</option>
                                    <option value="Dark">Dark</option>
                                    <option value="Brut">Brut</option>
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
                                <button type="submit" className="btn btn-primary m-2">Save</button>
                                <button type="submit" className="btn btn-outline-primary">Save & Copy</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

const ManageReport = () => {
    return (
        <div className="col-md-12 col-lg-12">
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
                                <th className="text-truncate">Sample Type</th>
                                <th className="text-truncate">Fab Ref</th>
                                <th className="text-truncate">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-truncate">1</td>
                                <td className="text-truncate">Group Dynamite</td>
                                <td className="text-truncate">100089151</td>
                                <td className="text-truncate">Blue</td>
                                <td className="text-truncate">1st Fit</td>
                                <td className="text-truncate">3293HRF-WECO-OCS25</td>
                                <td>
                                    <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-pencil-outline me-1"></i> Edit</a
                                            >
                                            <a className="dropdown-item" href="javascript:void(0);"
                                            ><i className="mdi mdi-trash-can-outline me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

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

const Sidebar = ({ currentView, handleMenuClick , activeMenuItem}) => {

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme open">
            <div className="app-brand demo">
                <a href="/development" className="app-brand-link">
                    <span className="app-brand-text demo menu-text fw-semibold ms-2">Tusuka-Lab</span>
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
                {/* <!-- Development --> */}
                <li className="menu-header fw-medium mt-4"><span className="menu-header-text">Development</span></li>
                {/* <!-- Buyers --> */}
                <li className={`menu-item ${activeMenuItem === 'create-buyer' || activeMenuItem === 'manage-buyer' ? 'active open' : ''}`}>
                    <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick('create-buyer')}>
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
                {/* <!-- Requirements --> */}
                <li className={`menu-item ${activeMenuItem === 'create-requirement' || activeMenuItem === 'manage-requirement' ? 'active open' : ''}`}>
                    <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick('create-requirement')}>
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
                            <a href="#" className="menu-link" onClick={(e) => {e.preventDefault(); handleMenuClick('manage-requirement'); }}>
                                <div data-i18n="Under Maintenance">Manage Req's</div>
                            </a>
                        </li>
                    </ul>
                </li>

                {/* <!-- Reports --> */}
                <li className={`menu-item ${activeMenuItem === 'create-report' || activeMenuItem === 'manage-report' ? 'active open' : ''}`}>
                    <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick('create-report')}>
                        <i className="menu-icon tf-icons mdi mdi-form-select"></i>
                        <div data-i18n="Misc">Reports</div>
                    </a>
                    <ul className="menu-sub">
                        <li className={`menu-item ${activeMenuItem === 'create-report' ? 'active' : ''}`}>
                            <a href="#" className="menu-link">
                                <div data-i18n="Error">Create</div>
                            </a>
                        </li>
                        <li className={`menu-item ${activeMenuItem === 'manage-report' ? 'active' : ''}`}>
                            <a href="#" className="menu-link" onClick={(e) => {e.preventDefault(); handleMenuClick('manage-report'); }}>
                                <div data-i18n="Under Maintenance">Manage Reports</div>
                            </a>
                        </li>

                    </ul>
                </li>

                {/* <!-- Misc --> */}
                <li className="menu-header fw-medium mt-4"><span className="menu-header-text">Misc</span></li>
                {/* <!-- Users --> */}
                <li className={`menu-item ${activeMenuItem === 'create-user' || activeMenuItem === 'manage-user' ? 'active open' : ''}`}>
                    <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick('create-user')}>
                        <i className="menu-icon tf-icons mdi mdi-account-outline"></i>
                        <div data-i18n="Account Settings">Users</div>
                    </a>
                    <ul className="menu-sub">
                        <li className={`menu-item ${activeMenuItem === 'create-user' ? 'active' : ''}`}>
                            <a href="#" className="menu-link" onClick={(e) => {e.preventDefault(); handleMenuClick('create-user'); }}>
                                <div data-i18n="Account">Create</div>
                            </a>
                        </li>
                        <li className={`menu-item ${activeMenuItem === 'manage-user' ? 'active' : ''}`}>
                            <a href="#" className="menu-link" onClick={(e) => {e.preventDefault(); handleMenuClick('manage-user'); }}>
                                <div data-i18n="Notifications">Manage Users</div>
                            </a>
                        </li>

                    </ul>
                </li>
                <li className="menu-item">
                    <a
                        href="https://github.com/shamimhcp1"
                        target="_blank"
                        className="menu-link">
                        <i className="menu-icon tf-icons mdi mdi-lifebuoy"></i>
                        <div data-i18n="Support">About Us</div>
                    </a>
                </li>

                {/* <!-- Misc --> */}
            </ul>
        </aside>
    );
};

const Navbar = ({handleMenuClick}) => {
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
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item d-flex align-items-center">
                            <i className="mdi mdi-magnify mdi-24px lh-0"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none bg-body"
                                placeholder="Search..."
                                aria-label="Search..." />
                        </div>
                    </div>
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
                                    <a className="dropdown-item pb-2 mb-1" href="#" onClick={(e) => {e.preventDefault(); handleMenuClick('profile-view'); }}>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2 pe-1">
                                                <div className="avatar avatar-online">
                                                    <img src="/static/development/assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">Shamim Hossain</h6>

                                                <small className="text-muted">
                                                    superuser
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
                                        onClick={(e) => {e.preventDefault(); handleMenuClick('profile-view'); }}>
                                        <i className="mdi mdi-account-outline me-1 mdi-20px"></i>
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"
                                        onClick={(e) => {e.preventDefault(); handleMenuClick('change-password'); }}>
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


const HomePage = ({ currentView, setCurrentView, handleMenuClick, activeMenuItem, setActiveMenuItem, getMessage, setMessage}) => {

    return (
        <div>
            {/* <!-- Layout wrapper --> */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* <!-- Menu --> */}
                    <Sidebar currentView={currentView} handleMenuClick={handleMenuClick} activeMenuItem={activeMenuItem}/>
                    {/* <!-- / Menu --> */}

                    {/* <!-- Layout container --> */}
                    <div className="layout-page">

                        {/* <!-- Navbar --> */}
                        <Navbar handleMenuClick={handleMenuClick}/>
                        {/* <!-- / Navbar --> */}

                        {/* <!-- Content wrapper --> */}
                        <div className="content-wrapper">
                            {/* <!-- Content --> */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row gy-4">
                                    {currentView === 'dashboard' && (
                                        <>
                                        <ReportCountWidget />
                                        <RecentReportWidget />
                                        </>
                                    )}
                                    {currentView === 'create-buyer' && <CreateBuyer currentView={currentView} setCurrentView={setCurrentView} 
                                        activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} getMessage={getMessage} setMessage={setMessage} /> }
                                    {currentView === 'manage-buyer' && <ManageBuyer getMessage={getMessage} setMessage={setMessage} /> }
                                    {currentView === 'create-requirement' && <CreateRequirement /> }
                                    {currentView === 'manage-requirement' && <ManageRequirement /> }
                                    {currentView === 'create-report' && <CreateReport /> }
                                    {currentView === 'manage-report' && <ManageReport /> }
                                    {currentView === 'create-user' && <CreateUser /> }
                                    {currentView === 'manage-user' && <ManageUser /> }
                                    {currentView === 'profile-view' && <ProfileView /> }
                                    {currentView === 'change-password' && <ChangePassword /> }
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


const App = () => {
    
    const [getMessage, setMessage] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [activeMenuItem, setActiveMenuItem] = React.useState(null);

    setTimeout(() => {
        setMessage(null);
    }, 5000);

    const handleMenuClick = (view) => {
        setCurrentView(view); // Update currentView
        console.log('CurrentView: ' + view);
        setActiveMenuItem(activeMenuItem === view ? null : view);
    };

    // useEffect when currentview change
    return (
        <div>
            <HomePage 
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                handleMenuClick={handleMenuClick} 
                activeMenuItem={activeMenuItem} 
                setActiveMenuItem={setActiveMenuItem}
                getMessage={getMessage}
                setMessage={setMessage}
            />
        </div>
    );
    
};

ReactDOM.render(<App />, app);