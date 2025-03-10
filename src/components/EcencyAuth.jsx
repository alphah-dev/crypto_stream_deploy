import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EcencyAuth({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      fetch("https://ecency.com/api/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUser(data.username);
            navigate("/");
          } else {
            alert("Failed to verify with Ecency.");
            navigate("/");
          }
        });
    }
  }, [navigate, setUser]);

  return <p>Verifying...</p>;
}

export default EcencyAuth;
