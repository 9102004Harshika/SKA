import axios from "axios";
import { toast } from "../../components/use-toast";

export const handleSubmit = async (
  e,
  formData,
  navigate,
  email,
  isCheckedTerms,
  isCheckedPrivacy
) => {
  e.preventDefault();

  if (!formData.gender) {
    toast({
      title: "Gender field required",
      description:
        "Please select your gender from the available options before proceeding with the enrollment process.",
      variant: "destructive",
    });
    return;
  }

  if (!isCheckedTerms || !isCheckedPrivacy) {
    toast({
      title:
        "Please agree to the Terms and Conditions and Privacy Policies to proceed.",
      description:
        "Please ensure that you agree with terms and conditions and privacy policies to proceed",
      variant: "destructive",
    });
    return;
  }

  // Prepare data
  const enrollmentData = { ...formData, email };
  console.log(enrollmentData);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}api/enroll`,
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
        description: "Congratulations! Your enrollment has been successfully completed.",
        variant: "success",
      });
    
      const token = sessionStorage.getItem("token");
      console.log("Session Token:", token);
      if (token) {
        navigate("/app");
      } else {
        // Optional: you may want to show a warning that token is missing
        toast({
          title: "Session Expired",
          description: "Please log in again to continue.",
          variant: "warning",
        });
        navigate("/login");
      }
    } else {
      toast({
        title: "Error in registration",
        description: "Enrollment not completed. Please try again.",
        variant: "destructive",
      });
    }
    
  } catch (error) {
    console.error(
      "Error submitting enrollment:",
      error.response?.data || error.message
    );
    toast({
      title: "Error",
      description: "An error occurred. Please try again.",
      variant: "destructive",
    });
  }
};

export const handleDateSelect = (
  date,
  setFormData,
  setSelectedDate,
  setShowCalendar
) => {
  const selectedDate = new Date(date); // Ensure it's a Date object
  setFormData((prevData) => ({
    ...prevData,
    dob: selectedDate, // Store as a Date object
  }));
  setSelectedDate(selectedDate);
  setShowCalendar(false); // Close the calendar
};
