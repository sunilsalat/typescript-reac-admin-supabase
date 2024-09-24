CREATE POLICY "Allow authorized access on press_releases table for SELECT"
ON public.press_releases
FOR SELECT
USING ( (SELECT authorize('press_releases.list')) );
