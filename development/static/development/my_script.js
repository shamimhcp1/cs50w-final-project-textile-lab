const app = document.getElementById('app');


function CreateBuyer() {
    return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row gy-4">
          <div className="col-md-12 col-lg-6">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Create Buyer</h5>
                <small className="text-muted float-end">Tusuka-Development</small>
              </div>
              <div className="card-body">
                <form method="POST" action="{% url 'buyer-add' %}">
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
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Sidebar = () => {
    const [activeMenuItem, setActiveMenuItem] = React.useState(null);
  
    const handleMenuClick = (index) => {
      setActiveMenuItem(activeMenuItem === index ? null : index);
    };
  
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
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
            <li className={`menu-item ${activeMenuItem === 0 ? 'active open' : ''}`}>
            <a
                href="/development"
                className="menu-link"
                onClick={() => handleMenuClick(0)}>
                <i className="menu-icon tf-icons mdi mdi-home-outline"></i>
                <div data-i18n="Email">Dashboard</div>
            </a>
            </li>
            {/* <!-- Development --> */}
            <li className="menu-header fw-medium mt-4"><span className="menu-header-text">Development</span></li>
            {/* <!-- Buyers --> */}
            <li className={`menu-item ${activeMenuItem === 1 ? 'active open' : ''}`}>
            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick(1)}>
                <i className="menu-icon tf-icons mdi mdi-star-outline"></i>
                <div data-i18n="Authentications">Buyers</div>
            </a>
            <ul className="menu-sub">
                <li className="menu-item">
                <a href="{% url 'buyer-add' %}" className="menu-link">
                    <div data-i18n="Basic">Add</div>
                </a>
                </li>
                <li className="menu-item">
                <a href="{% url 'buyer-manage' %}" className="menu-link">
                    <div data-i18n="Basic">Manage Buyers</div>
                </a>
                </li>
                
            </ul>
            </li>
            {/* <!-- Requirements --> */}
            <li className={`menu-item ${activeMenuItem === 2 ? 'active open' : ''}`}>
                <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick(2)}>
                <i className="menu-icon tf-icons mdi mdi-folder-wrench-outline"></i>
                <div data-i18n="Misc">Requirements</div>
                </a>
                <ul className="menu-sub">
                <li className="menu-item">
                    <a href="{% url 'add-requirement' %}" className="menu-link">
                    <div data-i18n="Error">Add</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="{% url 'manage-requirements' %}" className="menu-link">
                    <div data-i18n="Under Maintenance">Manage Req's</div>
                    </a>
                </li>
                </ul>
            </li>
            
            {/* <!-- Reports --> */}
            <li className={`menu-item ${activeMenuItem === 3 ? 'active open' : ''}`}>
            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick(3)}>
                <i className="menu-icon tf-icons mdi mdi-form-select"></i>
                <div data-i18n="Misc">Reports</div>
            </a>
            <ul className="menu-sub">
                <li className="menu-item">
                <a href="{% url 'create-report' %}" className="menu-link">
                    <div data-i18n="Error">Create</div>
                </a>
                </li>
                <li className="menu-item">
                <a href="{% url 'manage-reports' %}" className="menu-link">
                    <div data-i18n="Under Maintenance">Manage Reports</div>
                </a>
                </li>
                
            </ul>
            </li>
            
            {/* <!-- Misc --> */}
            <li className="menu-header fw-medium mt-4"><span className="menu-header-text">Misc</span></li>
            {/* <!-- Users --> */}
            <li className={`menu-item ${activeMenuItem === 4 ? 'active open' : ''}`}>
            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={() => handleMenuClick(4)}>
                <i className="menu-icon tf-icons mdi mdi-account-outline"></i>
                <div data-i18n="Account Settings">Users</div>
            </a>
            <ul className="menu-sub">
                <li className="menu-item">
                <a href="{% url 'add-user' %}" className="menu-link">
                    <div data-i18n="Account">Add</div>
                </a>
                </li>
                <li className="menu-item">
                <a href="{% url 'manage-users' %}" className="menu-link">
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



function HomePage() {

    return (
        <div>
            {/* <!-- Layout wrapper --> */}
            <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                {/* <!-- Menu --> */}

                <Sidebar/>
                {/* <!-- / Menu --> */}

                {/* <!-- Layout container --> */}
                <div className="layout-page">
                {/* <!-- Navbar --> */}

                <nav
                    className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                    id="layout-navbar">
                    <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
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
                            <a className="dropdown-item pb-2 mb-1" href="#">
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
                            <a className="dropdown-item" href="{% url 'my-profile' %}">
                                <i className="mdi mdi-account-outline me-1 mdi-20px"></i>
                                <span className="align-middle">My Profile</span>
                            </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="{% url 'change-password' %}">
                                <i className="mdi mdi-key-outline me-1 mdi-20px"></i>
                                <span className="align-middle">Change Password</span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider my-1"></div>
                            </li>
                            <li>
                            <a className="dropdown-item" href="{% url 'logout' %}">
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

                {/* <!-- / Navbar --> */}

                {/* <!-- Content wrapper --> */}
                <div className="content-wrapper">
                    {/* <!-- Content --> */}

                    <CreateBuyer />

                    {/* <!-- / Content --> */}

                    {/* <!-- Footer --> */}
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

            <div className="buy-now">
            <a
                href="https://github.com/shamimhcp1"
                target="_blank"
                className="btn btn-danger btn-buy-now"
                >Shamim Hossain</a
            >
            </div>
        </div>
    );
}

ReactDOM.render(<HomePage />, app);