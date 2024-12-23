import axios from "axios";
import { toast } from "../../components/use-toast";
export const handleSubmit = async (e,formData,navigate,email,isCheckedTerms,isCheckedPrivacy) => {
    e.preventDefault();
    if (!formData.gender) {
      toast({
        title: "Gender field required",
        description: "Please select your gender from the available options before proceeding with the enrollment process.",
        variant: "destructive",
      });
      return; // Prevent form submission if gender is not selected
    }
    else if (!isCheckedTerms || !isCheckedPrivacy) {
      toast({
        title: "Please agree to the Terms and Conditions and Privacy Policies to proceed.",
        description:
          "Please ensure that you agree with terms and conditions and privacy policies to proceed",
        variant: "destructive",
      });
      return; // Prevent form submission if checkboxes are not checked
    }

    // Proceed with form submission (existing submit logic)
    handleSubmit(e, formData, navigate, email);
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
