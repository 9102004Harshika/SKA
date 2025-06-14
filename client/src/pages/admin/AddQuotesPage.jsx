import { useState } from "react";
import { Button } from "../../ui/button";
import TextInput from "../../ui/textInput";
import axios from "axios";
import { toast } from "../../components/use-toast";
function QuoteForm() {
  const [formData, setFormData] = useState({
    quote: "",
    writtenBy: "",
  });
  const resetForm = () => {
    setFormData({
      quote: "",
      writtenBy: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}api/quotes/add`,
      formData
    );
    toast({
      title: "Quote Created Successfully",
      description: `You have successfully created a quote`,
      variant: "success",
    });
    resetForm();
  };
  return (
    /* one quote text , one written by dropdown , two buttons of for submit and one for clear */
    <div className="min-h-screen my-2">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-semibold md:tracking-wide font-header text-center mb-6">
          Create New Quote
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-6 flex flex-col"
        >
          <div className="flex">
            <div className="flex-1">
              <TextInput
                type="text"
                name="Quote Text"
                value={formData.quote}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quote: e.target.value,
                  })
                }
                label={"Quote Text"}
                required
              />

              <TextInput
                label="Written By"
                type="text"
                required
                value={formData.writtenBy}
                onChange={(e) =>
                  setFormData({ ...formData, writtenBy: e.target.value })
                }
              />
              <div className="flex justify-between mt-1 gap-6">
                <Button
                  text="Create Quote"
                  size="lg"
                  variant="primary"
                  type="submit"
                  className="w-full"
                  // disabled={loading}
                />
                <Button
                  text="Clear All"
                  size="lg"
                  variant="accent"
                  type="reset"
                  className="w-full"
                  // onClick={() => resetForm()}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default QuoteForm;
