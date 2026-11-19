import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcpairvivmenwlusjind.supabase.co";
const supabaseKey = "sb_publishable_htUQ8HyepnFnmMJ4xDa3lw_QlABd1d4";

export const supabase = createClient(supabaseUrl, supabaseKey);