-- Trigger when mangas create, create manga_views (pgsql)
CREATE OR REPLACE FUNCTION create_initial_manga_view()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO manga_views (manga_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger when mangas delete, delete manga_views (pgsql)
CREATE OR REPLACE FUNCTION delete_manga_view()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM manga_views WHERE manga_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- For old mangas if not exists manga_views create
INSERT INTO manga_views (manga_id)
SELECT id FROM mangas
WHERE NOT EXISTS (SELECT manga_id FROM manga_views WHERE manga_id = mangas.id);

-- Create trigger when mangas create, delete if not exists
CREATE TRIGGER create_initial_manga_view_trigger
AFTER INSERT ON mangas
FOR EACH ROW
EXECUTE FUNCTION create_initial_manga_view();

-- Create trigger when mangas delete, delete if not exists
CREATE TRIGGER delete_manga_view_trigger
AFTER DELETE ON mangas
FOR EACH ROW
EXECUTE FUNCTION delete_manga_view();
