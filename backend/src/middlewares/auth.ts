// Add User Authentication Here
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function userSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({email, password});
  if (error) {
    throw new Error(error.message);
  }
    return data;
}

export async function userSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({email, password});
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function userByToken(token: string) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function userSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}