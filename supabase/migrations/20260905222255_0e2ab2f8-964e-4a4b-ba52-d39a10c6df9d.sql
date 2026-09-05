REVOKE ALL ON FUNCTION public.claim_first_admin() FROM anon;
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;