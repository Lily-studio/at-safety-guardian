REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

DROP POLICY "nav public read" ON public.nav_items;
CREATE POLICY "nav public read" ON public.nav_items FOR SELECT USING (visible);
CREATE POLICY "nav admin read" ON public.nav_items FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "sections public read" ON public.sections;
CREATE POLICY "sections public read" ON public.sections FOR SELECT USING (visible AND status = 'published');
CREATE POLICY "sections admin read" ON public.sections FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "formations public read" ON public.formations;
CREATE POLICY "formations public read" ON public.formations FOR SELECT USING (visible AND status = 'published');
CREATE POLICY "formations admin read" ON public.formations FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "services public read" ON public.services;
CREATE POLICY "services public read" ON public.services FOR SELECT USING (visible AND status = 'published');
CREATE POLICY "services admin read" ON public.services FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "sectors public read" ON public.sectors;
CREATE POLICY "sectors public read" ON public.sectors FOR SELECT USING (visible);
CREATE POLICY "sectors admin read" ON public.sectors FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "refs public read" ON public.client_references;
CREATE POLICY "refs public read" ON public.client_references FOR SELECT USING (visible);
CREATE POLICY "refs admin read" ON public.client_references FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY "blog posts public read" ON public.blog_posts;
CREATE POLICY "blog posts public read" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "blog posts admin read" ON public.blog_posts FOR SELECT TO authenticated USING (public.is_admin());