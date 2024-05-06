import MainLayout from "@/src/app/Layout/MainLayout";
import EUMIR_logo from "@/src/Assets/EUMIR_logo.jpg";
import priority_list_logo from "@/src/Assets/priority_list_logo.jpg";
import article_logo from "@/src/Assets/article_logo.jpg";
import filing_complaint_logo from "@/src/Assets/filing_complaint_logo.jpg";
import Link from "next/link";
import Image from "next/image";
// import "@/src/app/globals.css";

function Home() {
  return (
    <MainLayout>
      <div className="">
        <br />
        <div className="col-md-12 text-center mt-5">
          <h1>Abbott PPG App</h1>
        </div>
        <br />
        <div className="col-md-12 text-center mt-3">
          <Link href="/eumir">
            <Image
              className="img-select mx-3 my-3"
              src={EUMIR_logo}
              style={{ width: "167px", height: "94px" }}
              alt="eumir"
            />
          </Link>
          <Link href="/priority_list">
            <Image
              className="img-select mx-3 my-3"
              src={priority_list_logo}
              style={{ width: "167px", height: "94px" }}
              alt="priority_list"
            />
          </Link>
          <Link href="/article">
            <Image
              className="img-select mx-3 my-3"
              src={article_logo}
              style={{ width: "167px", height: "94px" }}
              alt="article"
            />
          </Link>
          <Link href="/complaint_form">
            <Image
              className="img-select mx-3 my-3"
              src={filing_complaint_logo}
              style={{ width: "167px", height: "94px" }}
              alt="filing_complaint"
            />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
