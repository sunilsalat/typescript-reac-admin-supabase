CREATE POLICY "Allow authorized access on continents table for read"
ON public.continents
FOR SELECT
USING ( (SELECT authorize('continents.read')) );

CREATE POLICY "Allow authorized access on continents table for list"
ON public.continents
FOR SELECT
USING ( (SELECT authorize('continents.list')) );

CREATE POLICY "Allow authorized access on continents table for INSERT"
ON public.continents
FOR INSERT
WITH CHECK ( (SELECT authorize('continents.create')) );

CREATE POLICY "Allow authorized access on continents table for UPDATE"
ON public.continents
FOR UPDATE
USING ( (SELECT authorize('continents.update')) );

CREATE POLICY "Allow authorized access on continents table for DELETE"
ON public.continents
FOR DELETE
USING ( (SELECT authorize('continents.delete')) );
