import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/schema";

const supabaseUrl = "https://rxbntbozvydxtwrsgwnb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4Ym50Ym96dnlkeHR3cnNnd25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5Mzk5ODgsImV4cCI6MjAwMzUxNTk4OH0.CZfLRB4IjGqZbHMGWIoh-mdYZSRLzyfDIIOLf9j86Vw";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
