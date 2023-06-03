import NavEle from './navbar';
import { Link } from 'react-router-dom';




function Intro() {
  return (
    <>
      <div className="">
    <main className="">
        {/* <!-- Navigation--> */}
        <NavEle />
        

        {/* <!-- Header--> */}
        <header className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <h1 className="display-5 fw-bolder text-white mb-2">Scan & Trace Deepfake Videos
                            </h1>
                            <p className="lead fw-normal text-white-50 mb-4">Scan a suspicious video to find out if it’s
                                synthetically manipulated</p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <Link to="/addVideo" className="btn btn-primary btn-lg px-4 me-sm-3">Add Content</Link>
                                <Link to="/request-permission" className="btn btn-outline-light btn-lg px-4" >Use Existing content</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5"
                            src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80 1032w" alt="..." /></div>
                </div>
            </div>
        </header>
        {/* <!-- Features section--> */}
        <section className="py-5" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h2 className="fw-bolder mb-0">A better way to start countering.</h2>
                    </div>
                    <div className="col-lg-8">
                        <div className="row gx-5 row-cols-1 row-cols-md-2">
                            <div className="col mb-5 h-100 card card-body">
                                <div className="feature bg-primary bg-gradient text-center text-white rounded-3 mb-3"><i
                                        className="bi bi-collection"></i></div>
                                <h2 className="h5">Trace at a click</h2>
                                <p className="mb-0">Trace video using the efficient algorithms</p>
                            </div>
                            <div className="col mb-5 h-100 card card-body">
                                <div className="feature bg-primary bg-gradient text-center text-white rounded-3 mb-3"><i
                                        className="bi bi-building"></i></div>
                                <h2 className="h5">Blockchain</h2>
                                <p className="mb-0">Kickout the traditional methods of detecting fake videos</p>
                            </div>
                            <div className="col mb-5 mb-md-0 h-100 card card-body">
                                <div className="feature bg-primary bg-gradient text-center text-white rounded-3 mb-3"><i
                                        className="bi bi-toggles2"></i></div>
                                <h2 className="h5">DApp</h2>
                                <p className="mb-0">Decentralized application to provide user friendly interfaces</p>
                            </div>
                            <div className="col h-100 card card-body">
                                <div className="feature bg-primary bg-gradient text-center text-white rounded-3 mb-3"><i
                                        className="bi bi-toggles2"></i></div>
                                <h2 className="h5">Security</h2>
                                <p className="mb-0">Blockchain approachs with their well known security is used</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        
    </main>
  
    <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
            <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                <div className="col-auto">
                    <div className="small m-0 text-white">Copyright &copy; Your Website 2021</div>
                </div>
                <div className="col-auto">
                    <a className="link-light small" href="#!">Privacy</a>
                    <span className="text-white mx-1">&middot;</span>
                    <a className="link-light small" href="#!">Terms</a>
                    <span className="text-white mx-1">&middot;</span>
                    <a className="link-light small" href="#!">Contact</a>
                </div>
            </div>
        </div>
    </footer>

</div>
    </>
  );
}

export default Intro;
