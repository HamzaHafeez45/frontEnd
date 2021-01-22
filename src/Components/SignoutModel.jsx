import React, { Component } from "react";
class SignoutModel extends Component {
  render() {
    return (
      <>
        <div class="modal fade" id="sign-out">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Want to leave?</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">Press logout to leave</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                >
                  Stay Here
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignoutModel;
