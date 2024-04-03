import React from "react";

function Footer() {
  return (
    <footer className=" bg-slate-100  flex flex-col justify-between text-sm md:text-md pb-5">
      <div className="mt-2 w-full px-8 md;px-[500px] flex justify-around flex-col md:flex-row text-sm md:text-md py-8 ">
        <div className="flex flex-col gap-2 text-black">
          <p>All Project</p>
          <p>All Tasks</p>
         
        </div>

        <div className="flex flex-col gap-2 text-black">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="text-blacke text-center font-semibold">
        All Right Reserved @CodSoft Project Management Tool 2024
      </p>
    </footer>
  );
}

export default Footer;
