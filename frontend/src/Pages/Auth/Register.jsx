// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import SavingsIcon from "@mui/icons-material/Savings";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    setLoading(true);

    try {
      const { data } = await axios.post(registerAPI, { name, email, password });

      if (data.success) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/SetAvatar");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Registration Failed!", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const formVariant = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        ease: "easeOut",
        duration: 0.6,
      },
    }),
  };

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: { color: { value: "#000" } },
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            },
            particles: {
              number: { value: 80, density: { enable: true, area: 800 } },
              color: { value: "#00BFFF" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              links: { enable: true, distance: 150, color: "#00BFFF", opacity: 0.4, width: 1 },
              move: { enable: true, speed: 2, direction: "none", outModes: { default: "out" } },
            },
            detectRetina: true,
          }}
          style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, bottom: 0 }}
        />

        <Container className="mt-5" style={{ position: 'relative', zIndex: 2, color: "white" }}>
          <Row>
            <motion.h1 className="text-center" custom={0} initial="hidden" animate="visible" variants={formVariant}>
              <SavingsIcon sx={{ fontSize: 40, color: "white" }} />
            </motion.h1>

            <motion.h1 className="text-center text-white" custom={1} initial="hidden" animate="visible" variants={formVariant}>
              Welcome to Expense Management System
            </motion.h1>

            <Col md={{ span: 6, offset: 3 }}>
              <motion.h2 className="text-white text-center mt-5" custom={2} initial="hidden" animate="visible" variants={formVariant}>
                Registration
              </motion.h2>

              <Form onSubmit={handleSubmit}>
                {['name', 'email', 'password'].map((field, index) => (
                  <motion.div key={field} custom={index + 3} initial="hidden" animate="visible" variants={formVariant}>
                    <Form.Group controlId={`formBasic${field}`} className="mt-3">
                      <Form.Label className="text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                      <Form.Control
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        placeholder={`Enter ${field}`}
                        value={values[field]}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </motion.div>
                ))}

                <motion.div custom={6} initial="hidden" animate="visible" variants={formVariant} className="mt-4 text-center">
                  <Link to="/forgotPassword" className="text-white lnk">Forgot Password?</Link>
                </motion.div>

                <motion.div custom={7} initial="hidden" animate="visible" variants={formVariant} className="mt-3 text-center">
                  <Button type="submit" className="btnStyle" disabled={loading}>
                    {loading ? "Registering..." : "Signup"}
                  </Button>

                  <p className="mt-3" style={{ color: "#9d9494" }}>
                    Already have an account? <Link to="/login" className="text-white lnk">Login</Link>
                  </p>
                </motion.div>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Register;
