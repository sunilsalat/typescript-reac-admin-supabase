CREATE POLICY "Allow authorized access on profile table for SELECT"
ON public.profile
FOR SELECT
USING ( (SELECT authorize('profile.list')) );

CREATE POLICY "Allow authorized access on profile table for read"
ON public.profile
FOR SELECT
USING ( (SELECT authorize('profile.read')) );
