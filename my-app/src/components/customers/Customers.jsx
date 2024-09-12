import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { TbFileExport } from "react-icons/tb";
import group10 from "../images/Group 10.png";
import group11 from "../images/Group 11.png";
import group12 from "../images/Group 12.png";
import { CSVLink } from "react-csv";
import SyncLoader from "react-spinners/SyncLoader";
import PopUP from "./../Popup/PopUP";
function Customers() {
  //state

  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [, setError] = useState(null);
  const [inputdata, setInputdata] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [ticketType, setTicketType] = useState("typeA");
  const [lodding, setLodding] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // for download exel file
  const headers = [
    { label: "Customer name", key: "notes.name" },
    { label: "Phone number", key: "notes.phone" },
    { label: "Email", key: "notes.email" },
    { label: "Atanded Date", key: "notes.date" },
    { label: "No. of tickets", key: "notes.confirm_no_of_ticket" },
    { label: "Bank", key: "bank" },
    { label: "Total amount", key: `amount` },
    { label: "Method", key: "method" },
    { label: "Ticket status", key: "status" },
  ];
  //sidebar toggle
  const toggleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const handleRowClick = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  //for input change
  const handleChange = (e) => {
    setInputdata(e.target.value);
  };

  const URL = "https://norta-dashboard.onrender.com";

  //fetch data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${URL}/api/payments`);
        setLodding(true);
        setTimeout(() => {
          setLodding(false);
        }, 2000);
        setPayments(response.data.items || []);
        setFilteredPayments(response.data.items || []);
        const fetchedPayment = response.data.items || [];
        const savepayments = JSON.parse(localStorage.getItem("payments")) || [];
        const mergePayment = fetchedPayment.map((payment) => {
          const savePayment = savepayments.find((p) => p.id === payment.id);
          return savePayment
            ? { ...payment, statuus: savePayment.statuus }
            : payment;
        });
        setPayments(mergePayment);
        setFilteredPayments(mergePayment);
        localStorage.setItem("payments", JSON.stringify(mergePayment));
        localStorage.setItem("payment", JSON.stringify(response.data));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPayments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //filter data
    const fdata = filteredPayments.filter((payment) => {
      const { notes } = payment;
      return (
        payment.amount.toString().includes(inputdata) ||
        payment.status.toString().includes(inputdata) ||
        (notes.name && notes.name.toString().includes(inputdata)) ||
        (notes.email && notes.email.toString().includes(inputdata)) ||
        (notes.phone && notes.phone.toString().includes(inputdata)) ||
        (notes.conform_number_of_ticket &&
          notes.conform_number_of_ticket.toString().includes(inputdata)) ||
        (notes.date && notes.date.toString().includes(inputdata))
      );
    });
    setFilteredPayments(fdata);
  };

  //pagination
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = filteredPayments.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredPayments.length / recordPerPage);
  const numbers = [...Array(npage).keys()].map((n) => n + 1);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < npage) setCurrentPage(currentPage + 1);
  };

  //filter by ticket name
  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    const filtered = filteredPayments.filter((payment) => {
      const totalQty =
        (payment.amount - payment.fee) /
        payment.notes.confirm_no_of_ticket /
        100;
      return (
        (type === "ind(reg)" && totalQty === 629.0) ||
        (type === "ind(vip)" && totalQty === 1349.0) ||
        (type === "Se-Regular" && totalQty === 5099.0) ||
        (type === "SeVIP" && totalQty === 10999.0)
      );
    });
    setFilteredPayments(filtered);
    setCurrentPage(1);
  };
  //refresh
  const handleRefresh = () => {
    setInputdata("");
    setFilteredPayments(payments);
    setCurrentPage(1);
  };

  const totalTickets = useMemo(() => {
    return filteredPayments
      .filter((payment) => payment.status !== "failed")
      .reduce((total, payment) => {
        const tickets = Number(payment.notes.confirm_no_of_ticket) || 0;
        return total + tickets;
      }, 0);
  }, [filteredPayments]);

  const totleCustomers = useMemo(() => {
    return filteredPayments.filter((payment) => payment.status !== "failed")
      .length;
  }, [filteredPayments]);

  const totlecustomer = filteredPayments.length;

  const customerPercentage = useMemo(() => {
    return totlecustomer > 0 ? (totleCustomers / totlecustomer) * 100 : 0;
  });

  const handleTicketStatusClick = (payment) => {
    setSelectedPayment(payment);
  };
  const handleSaveStatus = (newStatus) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === selectedPayment.id
        ? { ...payment, statuus: newStatus }
        : payment
    );

    setPayments(updatedPayments);
    setFilteredPayments(updatedPayments);

    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    setSelectedPayment(null);
  };

  return (
    <>
      {/* header section-1 */}
      <div className="font-[Poppins] flex ">
        {sidebarToggle ? <div className="w-[320px] nirav"></div> : null}
        <Sidebar toggleClick={toggleClick} sidebarToggle={sidebarToggle} />
        <div className="w-[100%] ">
          <div className=" lg:w-[90%] w-[99%]  m-auto mt-5 xl:p-2 lg:p-10  p-2">
            <div className="sm:flex sm:justify-between sm:items-center">
              <h1 className="font-medium text-2xl">Hello SMJ 👋🏼</h1>
              <div className="bg-white flex items-center gap-2 py-1 px-2 border rounded-xl max-sm:mt-3">
                <i
                  className="fa-solid fa-magnifying-glass text-gray-400"
                  aria-hidden="true"
                ></i>
                <input
                  className="py-1 px-2 border-none outline-none focus:ring-2 focus:ring-[#069ea1] rounded-md"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* section-2 */}
            <div className="border mt-5 rounded-[30px] xl:px-14 px-1 py-8 bg-white shadow-sm">
              <div className="grid md:grid-cols-3">
                <div className="flex gap-5 mx-2 md:items-center max-md:my-5">
                  <img
                    className="max-xl:w-[60px] max-lg:h-[60px]"
                    src={group10}
                    alt="double human"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      Total Customers
                    </h5>
                    <h1 className="font-semibold xl:text-3xl text-xl my-1">
                      {totleCustomers}
                    </h1>
                    <span className="text-xs font-medium">
                      <i className="fa-solid fa-arrow-up text-green-400"></i>
                      <span className="text-green-400 mx-2">
                        {customerPercentage.toFixed()}%
                      </span>
                      This Week
                    </span>
                  </div>
                </div>
                <div className="flex gap-5 md:justify-center mx-2 md:border-l-2 md:border-r-2 items-center max-md:my-5">
                  <img
                    className="max-xl:w-[60px] max-lg:h-[60px]"
                    src={group11}
                    alt="sigle human"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      Members
                    </h5>
                    <h1 className="font-semibold xl:text-3xl text-xl my-1">
                      1,893
                    </h1>
                    <span className="text-xs font-medium">
                      <i className="fa-solid fa-arrow-down text-red-600"></i>
                      <span className="text-red-600 mx-2">16%</span>This Week
                    </span>
                  </div>
                </div>
                <div className="flex gap-5 items-center mx-2 md:justify-end max-md:my-5">
                  <img
                    className="max-xl:w-[60px] max-lg:h-[60px]"
                    src={group12}
                    alt="computer"
                  />
                  <div>
                    <h5 className="text-sm font-normal text-gray-500">
                      No of ticket sold
                    </h5>
                    <h1 className="font-semibold xl:text-3xl text-xl my-1">
                      {totalTickets}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* section-3 */}
            <div className="border mt-5  rounded-[30px] sm:px-10 px-5 sm:py-8 py-5 mb-10 bg-white shadow-sm">
              <div className="mx-2 my-2 flex flex-wrap justify-between items-center">
                <div className="mb-3">
                  <h1 className="font-semibold text-2xl">All Customers</h1>
                  <h6 className="text-[#16C098] font-normal mt-1">
                    Active Customers
                  </h6>
                </div>
                {/* filter table data form */}
                <div className="flex items-center flex-wrap gap-1">
                  <form
                    className="filterinput"
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <input
                      onChange={handleChange}
                      type="text"
                      name="inputdata"
                      value={inputdata}
                      className="bg-[#F9FBFF]  sm:px-5 max-sm:w-[68%] pl-3 py-2 border border-gray-300  outline-none focus:ring-2 focus:ring-[#069ea1] rounded-lg text-xs max-md:my-1"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="mr-1 ml-3   cursor-pointer bg-[#069ea1] hover:bg-[#088ea1] text-white py-[0.4rem] text-sm rounded-lg px-3"
                    >
                      Search
                    </button>
                  </form>
                  {/* filter table data by ticketname */}
                  <div className="flex justify-between items-center flex-wrap">
                    <div className="text-xs bg-[#F9FBFF] px-5 py-[0.38rem] border border-gray-300  rounded-lg max-md:my-1 mr-1 font-semibold">
                      <span className="text-sm">Ticket name: </span>
                      <select
                        value={ticketType}
                        onChange={(e) => handleTicketTypeChange(e.target.value)}
                        className="px-1 rounded-sm font-medium"
                      >
                        <option value="" className="bg-[#F9FBFF] font-medium">
                          Ticket-type
                        </option>
                        <option
                          value="ind(reg)"
                          className="bg-[#F9FBFF] font-medium"
                        >
                          In-regular
                        </option>
                        <option
                          value="ind(vip)"
                          className="bg-[#F9FBFF] font-medium"
                        >
                          InVIP
                        </option>
                        <option
                          value="sea(Reg)"
                          className="bg-[#F9FBFF] font-medium"
                        >
                          Se-Regular
                        </option>
                        <option
                          value="sea(vip)"
                          className="bg-[#F9FBFF] font-medium"
                        >
                          SeVIP
                        </option>
                      </select>
                    </div>

                    {/* refresh button */}
                    <CSVLink
                      data={filteredPayments}
                      headers={headers}
                      filename="Norta-Dashboard_data.csv"
                    >
                      <button className="bg-[#069ea1] px-3 py-[0.38rem] text-white text-sm rounded-lg flex justify-center items-center gap-1">
                        Export <TbFileExport />
                      </button>
                    </CSVLink>

                    <i
                      onClick={handleRefresh}
                      className="fa-solid fa-arrows-rotate ml-2 cursor-pointer border border-gray-300 px-2 py-[0.45rem] rounded-md bg-[#F9FBFF]"
                    ></i>
                  </div>
                </div>
              </div>

              {/* section-4 table */}
              <div className="mt-6 relative overflow-x-auto  overflow-y-hidden">
                <table className="w-full border-collapse border-spacing-0">
                  <thead>
                    <tr className="text-[#b5b7c0] m-12 font-medium">
                      <th>Sr no</th>
                      <th>Customer name</th>
                      <th>Phone number</th>
                      <th>Email</th>
                      <th>Atanded Date</th>
                      <th>No. of tickets</th>
                      <th>Ticket price</th>
                      <th>Total amount</th>
                      <th>Ticket name</th>
                      <th>Payment status</th>
                      <th>Ticket status</th>
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
                      records.map((tdata, index) => {
                        const qut = tdata.amount;
                        const confirmNoOfTicket =
                          tdata.notes.confirm_no_of_ticket || 1;
                        const totalQut = qut / confirmNoOfTicket;
                        const ticketName = () => {
                          const value = totalQut / 100;
                          if (value === 629.0) {
                            return <p>InRegular</p>;
                          } else if (value === 1349.0) {
                            return <p>InVIP</p>;
                          } else if (value === 5099.0) {
                            return <p>SeRegular</p>;
                          } else if (value === 10999.0) {
                            return <p>SeVIP</p>;
                          } else {
                            return <p>None</p>;
                          }
                        };
                        const serialNumber = firstIndex + index + 1;

                        return (
                          <React.Fragment key={tdata.id}>
                            <tr
                              className="h-10 text-sm m-12 cursor-pointer font-medium"
                              onClick={() => handleRowClick(tdata.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <td>{serialNumber}</td>
                              <td>{tdata.notes.name}</td>
                              <td>{tdata.notes.phone}</td>
                              <td>{tdata.notes.email}</td>
                              <td>{tdata.notes.date}</td>
                              <td>{tdata.notes.confirm_no_of_ticket}</td>
                              <td>{(totalQut / 100).toFixed(2)}</td>
                              <td>{(tdata.amount / 100).toFixed(2)}</td>
                              <td>
                                <button>{ticketName()}</button>
                              </td>
                              <td>
                                <button>{tdata.status}</button>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleTicketStatusClick(tdata)}
                                  className="border px-2 py-1 rounded-md bg-[#069ea1] text-white"
                                >
                                  {!tdata.statuus ? "Pending" : tdata.statuus}
                                </button>
                              </td>
                            </tr>

                            {expandedRowId === tdata.id && (
                              <tr>
                                <td colSpan="12">
                                  <div className="border m-1 border-gray-300 rounded-lg">
                                    <div className="flex p-5 justify-between ">
                                      <div>
                                        <h2 className="text-start text-sm mb-1 text-[#B5B7C0]">
                                          Order Id:{" "}
                                          <span className="text-black text-xs">
                                            {tdata.order_id}
                                          </span>{" "}
                                        </h2>

                                        <h2 className="text-start text-sm mb-1 text-[#B5B7C0]">
                                          Method:{" "}
                                          <span className="text-black text-xs">
                                            {tdata.method}
                                          </span>{" "}
                                        </h2>
                                      </div>
                                      <div>
                                        <div className="flex gap-5 items-center">
                                          <h2 className="text-[#B5B7C0]">
                                            OTP for ticket collection
                                          </h2>
                                          <h2 className="text-[#00A198]">
                                            Resend OTP to client
                                          </h2>
                                        </div>
                                        <form className="flex gap-2 mt-2">
                                          <input
                                            type="text"
                                            className="border rounded-md py-1 px-5"
                                          />
                                          <button className="px-5 rounded-md py-1 bg-[#ea1d8467]">
                                            Submit
                                          </button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {selectedPayment && (
                <PopUP
                  currentStatus={selectedPayment.status}
                  onClose={() => setSelectedPayment(null)}
                  onSave={handleSaveStatus}
                />
              )}
              {/* pagination */}
              <div className=" flex justify-between items-center   mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-[0.4rem] bg-[#069ea1] text-white rounded-lg mr-2 cursor-pointer text-base m-3  hover:text-white"
                >
                  Prev
                </button>
                <div>
                  {numbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-4 cursor-pointer py-[0.4rem] rounded-lg mr-2 ${
                        currentPage === number
                          ? "bg-[#069ea1] text-white"
                          : "bg-white text-blue-500 border border-blue-500"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === npage}
                  className="px-4 py-[0.4rem] bg-[#069ea1] text-white rounded-lg mr-2 cursor-pointer text-base m-3  hover:text-white"
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

export default Customers;
