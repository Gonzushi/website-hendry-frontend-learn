import Link from "next/link";
import AbbottLogo from "@/src/Assets/abbott_logo_2.png";
import Image from "next/image";
import { redirect } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar bg-body-tertiary border-bottom flex justify-between">
      <div className="">
        <Link className="navbar-brand ms-4 flex" href="/">
          <Image
            src={AbbottLogo}
            alt="Abbott"
            width="30"
            height="24"
            className="pb-1"
          />
          <span className="ms-3 font-semibold">Abbott Vascular PPG</span>
        </Link>
      </div>
      <div className="col-md-6 text-end d-none d-md-block me-4">
        <a href="/api/auth/signout">
          <button type="button" className="btn btn-primary">
            Sign Out
          </button>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
