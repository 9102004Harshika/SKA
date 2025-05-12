import Quotes from "../models/Quotes.js";

export const createQuote=async(req,res)=>{
try {
    const newQuote = new Quotes(req.body);
    await newQuote.save();
    res.status(201).json({ message: "Quote created successfully", newQuote });
  } catch (error) {
    res.status(400).json({ message: "Error creating quote", error });
  }
}
export const getQuote=async(req,res)=>{
    try {
    const quotes = await Quotes.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(400).json({ message: "Error fetching quotes", error });
  }
}