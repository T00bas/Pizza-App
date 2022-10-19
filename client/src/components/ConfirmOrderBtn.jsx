import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import React, { useState } from "react";

export default function ConfirmOrderBtn(props) {
  const [basicModal, setBasicModal] = useState(false);
  const [totalBill, setTotalBill] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  function ConfirmOrder() {
    let bill = 0;
    const order_items = props.selectedPizzas.map((pizza) => {
      pizza.price *= pizza.quantity;
      bill += pizza.price;

      return {
        item: pizza.name,
        quantity: pizza.quantity,
      };
    });
    setOrderItems(() => {
      return props.selectedPizzas.map((pizza) => {
        return {
          name: pizza.name,
          quantity: pizza.quantity,
          price: pizza.price,
        };
      });
    });
    setTotalBill(bill);
    //console.log(bill);
    const newOrder = {
      order_items: order_items,
      total_bill: bill,
    };
    axios
      .post("/api/orders", newOrder)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setBasicModal(!basicModal);
    props.setSelected([]);
  }

  return (
    <>
      <section>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 text-center">
            <MDBCol>
              <button onClick={ConfirmOrder} className="btn-confirm">
                <strong>Confirm Order</strong>
              </button>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader className="border-bottom-0">
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={() => setBasicModal(!basicModal)}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-start text-black p-4">
                      <MDBTypography
                        tag="h4"
                        className="mb-5"
                        style={{ color: "#e67e22" }}
                      >
                        Your order is confirmed
                      </MDBTypography>
                      <p className="mb-0" style={{ color: "#e98b38" }}>
                        Order summary
                      </p>
                      <hr
                        className="mt-2 mb-4"
                        style={{
                          height: "0",
                          backgroundColor: "transparent",
                          opacity: ".75",
                          borderTop: "2px dashed #9e9e9e",
                        }}
                      />
                      {orderItems.map((item) => {
                        return (
                          <div className="d-flex justify-content-between">
                            <p className="fw-bold mb-0">
                              {item.name} (Qty:{item.quantity})
                            </p>
                            <p className="text-muted mb-0">${item.price}</p>
                          </div>
                        );
                      })}

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">Total</p>
                        <p className="fw-bold" style={{ color: "#e98b38" }}>
                          ${totalBill}
                        </p>
                      </div>
                    </MDBModalBody>

                    <MDBModalFooter className="d-flex justify-content-center border-top-0 py-4">
                      <MDBBtn
                        color="dark"
                        onClick={() => {
                          setBasicModal(!basicModal);
                          setTotalBill(0);
                        }}
                      >
                        Close
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
