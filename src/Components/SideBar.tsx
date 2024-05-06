import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <>
            <div id="accordion-general" className="accordion accordion-flush">

                 <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush1" aria-expanded="false" aria-controls="flush1">
                            Announcement
                        </button>
                    </h2>
                    <div id="flush1" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quasi veniam reiciendis laborum maxime repellat hic, nemo adipisci vero asperiores at voluptatem, eaque corrupti? Maxime nesciunt perferendis aperiam consequuntur obcaecati!
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush3" aria-expanded="false" aria-controls="flush3">
                            Report
                        </button>
                    </h2>
                    <div id="flush3" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                                <Link className="list-group-item" to='/eumir'>EU MIR</Link>
                                <Link className="list-group-item" to='/priority_list'>Priority List</Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;