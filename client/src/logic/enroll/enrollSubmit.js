import axios from "axios";
import { toast } from "../../components/use-toast";
export const handleSubmit = async (e,formData,navigate,email) => {
    e.preventDefault();

    // Send enrollment data to the backend
    const enrollmentData = { ...formData, email };
    console.log(enrollmentData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/enroll", // Your API endpoint
        enrollmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Enrollment Successful",
          description:
            "Congratulations! Your enrollment has been successfully completed.",
          variant: "success",
        });
        navigate("/login"); // Navigate to the login page after successful enrollment
      } else {
        toast({
          title: "Error in registration ",
          description: "ENROLLMENT NOT DONE",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(
        "Error submitting enrollment:",
        error.response?.data || error.message
      );
      console.error("Error submitting enrollment:", error);
      alert("An error occurred. Please try again.");
    }
  };
export const handleDateSelect = (date, setFormData, setSelectedDate, setShowCalendar) => {
    const selectedDate = new Date(date); // Ensure it's a Date object
    setFormData((prevData) => ({
        ...prevData,
        dob: selectedDate, // Store as a Date object
    }));
    setSelectedDate(selectedDate);
    setShowCalendar(false); // Close the calendar
};
