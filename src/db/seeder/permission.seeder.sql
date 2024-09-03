INSERT INTO public.policies (name, description) values ('continents.list', 'list privilleges on continents table');
INSERT INTO public.policies (name, description) values ('continents.read', 'read privilleges on continents table');
INSERT INTO public.policies (name, description) values ('continents.update', 'update privilleges on continents table');
INSERT INTO public.policies (name, description) values ('continents.delete', 'delete privilleges on continents table');



INSERT INTO public.access_policies (role, permission_id, permission_name) values ('user', 4, 'continents.read')