import { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import { endPoints } from "../endpoints";

const useFetchData = () => {
  // state for a fetched clocked in student
  const [data, setData] = useState([
    {
      fullName: "",
      lga: "",
      code: "",
      timeIn: "",
      timeOut: "",
    },
  ]);

  // loader state
  const [loading, setLoading] = useState(false);

  // function to make HTTP request to the server
  const fetchData = () => {
    setLoading(true);
    fetch(baseUrl + endPoints.getAllStudentClockedIn)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // this helps run the fetch data when the component mounts
  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
  };
};

export default useFetchData;
