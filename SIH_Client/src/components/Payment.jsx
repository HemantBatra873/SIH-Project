import axios from "axios";
import { useState } from "react";

const Payment = () => {
    const [UPIid, setUPIid] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(0);
    const [check, setCheck] = useState(false);
    return (
    <>
    <br />
    <br />
    <br />
    <br />
        <div className="font-[sans-serif] bg-white p-4 lg:max-w-7xl max-w-xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 max-lg:order-1">
          <form className="mt-16 max-w-lg">
            <h2 className="text-2xl font-extrabold text-gray-800">Powered By UPI</h2>

            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              <div className="flex items-center">
                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://www.vectorlogo.zone/logos/upi/upi-ar21.svg" className="w-20" alt="paypalCard" />
                </label>
              </div>
            </div>

            <div className="grid gap-4 mt-8">
              <input type="text" onChange={(e) => {setUPIid(e.target.value)}} placeholder="UPI id"
                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" />

              <div className="flex bg-white border-b-2 focus-within:border-gray-800 overflow-hidden">
                <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none" />
              </div>
            
              <div className="grid grid-cols-2 gap-6">
                <input type="number" onChange={(e) => {setNumber(Number(e.target.value))}} placeholder="Amount" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"></input>
              </div>

              <div className="flex items-center">
                <input id="remember-me" name="remember-me" onClick={(e) => {setCheck(!check)}} type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button disabled={check === false?true:false} onClick={() => {
                axios.post("http://localhost:3000/pay", {
                  UPIid: UPIid,
                  email: email,
                  number: number,
                }).then((response) => {
                  if (response.data.message === "Success") {
                    
                  }
                }).catch((err) => {
                  console.log(err);
                })
              }} type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]">Pay</button>
            </div>
          </form>
        </div>
        <div className="border-2 p-6 rounded-md">
          <h2 className="text-4xl font-extrabold ">Breakdown</h2>

          <ul className=" mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">Special Event <span className="ml-auto font-bold">₹300.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">₹{number*0.05}</span></li>
            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">₹{number + number*0.05 + 300}</span></li>
          </ul>
        </div>
      </div>
    </div>
    </>
    )
}

export default Payment;
