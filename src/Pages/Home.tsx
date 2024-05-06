import MainLayout from "./Layout/MainLayout.tsx";
import EUMIR_logo from "../Assets/EUMIR_logo.jpg";
import priority_list_logo from "../Assets/priority_list_logo.jpg";
import article_logo from "../Assets/article_logo.jpg";
import filing_complaint_logo from "../Assets/filing_complaint_logo.jpg";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <MainLayout>
      <div className="container-fluid row no-gutters">
        <br />
        <br />
        <br />
        <br />
        <div className="col-md-12 text-center mt-5">
          <h1>Abbott PPG App</h1>
        </div>
        <div className="col-md-12 text-center mt-3 mx-3">
          <Link to="/eumir"><img className="img-select mx-3 my-3" src={EUMIR_logo} style={{ width: '167px', height: '94px' }} /></Link>
          <Link to="/priority_list"><img className="img-select mx-3 my-3" src={priority_list_logo} style={{ width: '167px', height: '94px' }} /></Link>
          <Link to="/article"><img className="img-select mx-3 my-3" src={article_logo} style={{ width: '167px', height: '94px' }} /></Link>
          <Link to="/filing_complaint_2"><img className="img-select mx-3 my-3" src={filing_complaint_logo} style={{ width: '167px', height: '94px' }} /></Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;