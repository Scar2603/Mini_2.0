import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './Error';


function CompanyPage() {
  let { title } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Access isAuthenticated state
  const navigate = useNavigate();

  const handleTakeTest = () => {
    if (!isAuthenticated) {
      toast.error("Please Login to give test !");
    } else {
      navigate(`/${title}/quiz`); // Replace '/quiz' with the actual path to the quiz page
    }
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/auth/${title}/`)
      .then(response => {
        console.log(response.data);
        setCompanyData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [title]);

  if (!companyData) return <ErrorPage />;


  return (
    <div >
      <Nav />
      <div className="hero min-h-screen " style={{ backgroundImage: 'url("Hero_bg.png")' }}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={companyData.info[0].Image_URL} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{companyData.info[0].Company_name}</h1>
            <p className="py-6">{companyData.info[0].Heading}</p>
            <p className="py-6">{companyData.info[0].Description}</p>
            <button onClick={handleTakeTest} className='btn btn-secondary'>Solve Test</button>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;