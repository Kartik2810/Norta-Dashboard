import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import group10 from "../images/Group 10.png";
import group11 from "../images/Group 11.png";
import group12 from "../images/Group 12.png";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";
function Transection() {
  const [sidebarToggle, setSidebarToggle] = React.useState(true);
  const [payments, setPayments] = useState([]);
  const [paymentdata, setPaymentdata] = useState([]);
  const [inputdata, setInputData] = useState();
  const [lodding, setLodding] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);

  const toggleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };

  useEffect(() => {
    const PaymentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments");
        const { data } = response;
        setPayments(data.items || []);
        setPaymentdata(data.items || []);
        setLodding(true);
        setTimeout(() => {
          setLodding(false);
        }, 2000);
      } catch (error) {
        toast.error("data not found");
      }
    };
    PaymentData();
  }, []);

  const recordPerPage = 10;
  const lastindex = currentpage * recordPerPage;
  const firstindex = lastindex - recordPerPage;
  const records = paymentdata.slice(firstindex, lastindex);
  const npage = Math.ceil(paymentdata.length / recordPerPage);
  const numbers = [...Array(npage).keys()].map((n) => n + 1);

  const prevPage = () => {
    if (currentpage > 1) setCurrentpage(currentpage - 1);
  };
  const nextPage = () => {
    if (currentpage < npage) setCurrentpage(currentpage + 1);
  };

  const totalRevenue = useMemo(() => {
    return paymentdata
      .filter((payment) => payment.status !== "failed")
      .reduce((total, payment) => {
        const tickets = Number(Math.floor(payment.amount / 100)) || 0;
        return total + tickets;
      }, 0);
  }, [paymentdata]);

  const successfulTransaction = useMemo(() => {
    return paymentdata.reduce((total, payment) => {
      if (payment.status === "captured") {
        return total + 1;
      }
      return total;
    }, 0);
  }, [paymentdata]);

  const totalTransection = paymentdata.length;

  const successfulPecentage = useMemo(() => {
    return totalTransection > 0
      ? (successfulTransaction / totalTransection) * 100
      : 0;
  }, [successfulTransaction, totalTransection]);

  const failedTransaction = useMemo(() => {
    return paymentdata.reduce((total, payment) => {
      if (payment.status === "failed") {
        return total + 1;
      }
      return total;
    }, 0);
  }, [paymentdata]);

  const failedPecentage = useMemo(() => {
    return totalTransection > 0
      ? (failedTransaction / totalTransection) * 100
      : 0;
  }, [failedTransaction, totalTransection]);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterdata = paymentdata.filter((payment) => {
      const { notes } = payment;
      return (
        payment.status.toString().includes(inputdata) ||
        (notes.name && notes.name.toString().includes(inputdata)) ||
        (notes.confirm_no_of_ticket &&
          notes.confirm_no_of_ticket.toString().includes(inputdata))
      );
    });
    setPaymentdata(filterdata);
    setCurrentpage(1);
  };
  //refresh
  const handleRefresh = () => {
    setInputData("");
    setPaymentdata(payments);
    setCurrentpage(1);
  };
  return (
    <>
      <div className="coutmers flex font-[Poppins]">
        {sidebarToggle ? <div className="w-[320px] nirav"></div> : null}
        <Sidebar toggleClick={toggleClick} sidebarToggle={sidebarToggle} />
        <div className="w-[100%] ">
          <div className="2xl:w-[90%] w-[95%]  m-auto 2xl:mt-16 mt-10  pl-2">
            <div className="sm:flex sm:justify-between sm:items-center">
              <h1 className="font-medium 2xl:text-2xl text-xl">Hello SMJ 👋🏼</h1>
              <div className="bg-white flex items-center gap-2 2xl:py-1 py-[0.18rem] 2xl:px-2 px-1 border rounded-xl  max-sm:mt-3">
                <i
                  className="fa-solid fa-magnifying-glass text-gray-400"
                  aria-hidden="true"
                ></i>
                <input
                  className="2xl:py-1 py-[0.18rem] px-2 border-none outline-none focus:ring-2 focus:ring-[#069ea1] rounded-md"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* section-2 */}
            <div className="border 2xl:mt-10 mt-7 2xl:rounded-[30px] rounded-[20px] px-14 py-8  bg-white shadow-sm">
              <div className="grid md:grid-cols-3">
                <div className=" flex gap-5 mx-2 md:items-center max-md:my-5">
                  <img
                    className="max-2xl:w-[60px] max-2xl:h-[60px]"
                    src={group10}
                    alt="double-human"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      Successful transaction
                    </h5>
                    <h1 className="font-semibold 2xl:text-3xl text-2xl my-1">
                      {successfulTransaction}
                    </h1>
                    <span className="text-xs font-medium">
                      <i className="fa-solid fa-arrow-up text-green-400"></i>
                      <span className="text-green-400 mx-2">
                        {successfulPecentage.toFixed(2)}%
                      </span>
                      This Week
                    </span>
                  </div>
                </div>
                <div className="flex gap-5 md:justify-center mx-2  md:border-l-2 md:border-r-2 items-center  max-md:my-5">
                  <img
                    className="max-2xl:w-[60px] max-2xl:h-[60px]"
                    src={group11}
                    alt="single-human"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      Failed Transaction
                    </h5>
                    <h1 className="font-semibold 2xl:text-3xl text-2xl my-1">
                      {failedTransaction}
                    </h1>
                    <span className="text-xs font-medium">
                      <i className="fa-solid fa-arrow-down text-red-600"></i>
                      <span className="text-red-600 mx-2">
                        {failedPecentage.toFixed(2)}%
                      </span>
                      This Week
                    </span>
                  </div>
                </div>
                <div className=" flex gap-5 items-center mx-2  md:justify-end  max-md:my-5">
                  <img
                    className="max-2xl:w-[60px] max-2xl:h-[60px]"
                    src={group12}
                    alt="pc"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      Total revenue
                    </h5>
                    <h1 className="font-semibold 2xl:text-3xl text-2xl my-1">
                      {totalRevenue}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* section-3 */}
            <div className="border 2xl:mt-10 mt-7 2xl:rounded-[30px] rounded-[20px] px-10 py-8  bg-white shadow-sm">
              <div className="mx-2 my-2 flex max-md:flex-wrap justify-between items-center">
                <div className="mb-3">
                  <h1 className="font-semibold 2xl:text-2xl text-xl">
                    All Customers
                  </h1>
                </div>
                <div className="flex max-md:flex-wrap gap-3">
                  <form action="" onSubmit={handleSubmit}>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="inputdata"
                      value={inputdata}
                      className="bg-[#F9FBFF] sm:px-5 max-sm:w-[68%] pl-3 2xl:py-2 py-[0.40rem] border border-gray-300  outline-none focus:ring-2 focus:ring-[#069ea1] rounded-lg text-xs max-md:my-1"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="mr-1 ml-3  cursor-pointer bg-[#069ea1] hover:bg-[#088ea1] text-white py-[0.4rem] 2xl:text-sm text-xs rounded-lg px-3"
                    >
                      Search
                    </button>
                  </form>
                  <i
                    onClick={handleRefresh}
                    className="fa-solid fa-arrows-rotate ml-2 cursor-pointer border border-gray-300 px-2 2xl:py-[0.45rem] py-[0.36rem] rounded-md bg-[#F9FBFF]"
                  ></i>
                </div>
              </div>

              {/* section-4 table */}
              <div className=" mt-6 relative overflow-x-auto overflow-y-hidden">
                <table className="w-full border-collapse border-spacing-0">
                  <thead>
                    <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">No. of tickets</th>

                      <th scope="col">Transaction id</th>
                      <th scope="col">Total amount</th>
                      <th scope="col">Ticket status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lodding ? (
                      <tr>
                        <td colSpan="11" className="text-center">
                          <div className="flex justify-center items-center w-full h-full">
                            <SyncLoader
                              margin={1}
                              speedMultiplier={1}
                              color={"#069ea1"}
                              loading={lodding}
                              size={10}
                            />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      records.map((tdata) => {
                        const transectionType = () => {
                          if (tdata.acquirer_data.upi_transaction_id) {
                            return tdata.acquirer_data.upi_transaction_id;
                          } else {
                            return tdata.acquirer_data.bank_transaction_id;
                          }
                        };

                        return (
                          <React.Fragment key={tdata.id}>
                            <tr>
                              <td>{tdata.notes.name}</td>
                              <td>{tdata.notes.confirm_no_of_ticket}</td>
                              <td>{transectionType()}</td>
                              <td>₹ {tdata.amount / 100}</td>
                              <td className="py-4 px-6">
                                <span
                                  className={`px-2 py-1 rounded-full ${
                                    tdata.status === "captured"
                                      ? "bg-green-200 text-green-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {tdata.status}
                                </span>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {/*pagination */}
              <div className="flex justify-between items-center   mt-4">
                <button
                  disabled={currentpage === 1}
                  onClick={prevPage}
                  className="px-4 py-[0.4rem] bg-[#069ea1] text-white rounded-lg mr-2 cursor-pointer 2xl:text-base text-xs m-3  hover:text-white"
                >
                  Prev
                </button>
                <div>
                  <div>
                    {numbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => setCurrentpage(number)}
                        className={`px-4 cursor-pointer py-[0.4rem] rounded-lg mr-2 ${
                          currentpage === number
                            ? "bg-[#069ea1] text-white"
                            : "bg-white text-blue-500 border border-blue-500"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={nextPage}
                  className="px-4 py-[0.4rem] bg-[#069ea1] text-white rounded-lg mr-2 cursor-pointer 2xl:text-base text-xs m-3  hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transection;
