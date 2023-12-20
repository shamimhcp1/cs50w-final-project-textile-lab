// CreateBuyer.js
import React from 'react';

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

export default CreateBuyer;
