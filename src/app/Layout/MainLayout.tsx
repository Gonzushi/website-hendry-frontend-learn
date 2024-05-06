import NavBar from "@/src/Components/NavBar";
import "./MainLayout.css";

function MainLayout({ children }: { children: any }) {
  return (
    <div className="container-fluid">
      <NavBar />
      <div className="">
        {/* <div id="sideBar" className="col-md-2 collapse collapse-horizontal border-end">
                    <SideBar />
                </div> */}
        <div className="ms-1 me-1 mt-4 container-fluid">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
