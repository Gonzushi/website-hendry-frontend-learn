import NavBar from "@/src/Components/NavBar";
import "./MainLayout.css";

function MainLayout({ children }: { children: any }) {
  return (
    <div className="">
      <NavBar />
      <div className="">
        {/* <div id="sideBar" className="col-md-2 collapse collapse-horizontal border-end">
                    <SideBar />
                </div> */}
        <div className="ms-4 me-4 mt-4">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
