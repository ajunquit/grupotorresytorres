-- ================================
-- Seed Customers Ene–Jul 2025 (v2)
-- ================================
SET NOCOUNT ON;
BEGIN TRY
BEGIN TRAN;

-- Plan por mes (Ene=6, Feb=12, Mar=10, Abr=18, May=6, Jun=32, Jul=25)
DECLARE @Plan TABLE(MonthStart date, Qty int);
INSERT @Plan VALUES
('2025-01-01',6),('2025-02-01',12),('2025-03-01',10),
('2025-04-01',18),('2025-05-01',6),('2025-06-01',32),('2025-07-01',25);

-- Catálogos con IDENTITY para selección aleatoria
CREATE TABLE #FirstNames (Id int IDENTITY(1,1) PRIMARY KEY, Val nvarchar(50));
INSERT #FirstNames(Val) VALUES
(N'Alejandro'),(N'Agustín'),(N'Katherine'),(N'Andrea'),(N'Juan'),(N'María'),
(N'Pedro'),(N'Carla'),(N'Diego'),(N'Lucía'),(N'Javier'),(N'Sofía'),
(N'Bruno'),(N'Valentina'),(N'Gabriel'),(N'Camila'),(N'Marco'),(N'Daniela'),
(N'Pablo'),(N'Laura');

CREATE TABLE #LastNames (Id int IDENTITY(1,1) PRIMARY KEY, Val nvarchar(50));
INSERT #LastNames(Val) VALUES
(N'Junqui'),(N'Arevalo'),(N'Fernández'),(N'Pérez'),(N'González'),(N'Rodríguez'),
(N'Sánchez'),(N'Ramírez'),(N'Herrera'),(N'Castro'),(N'Vargas'),(N'Flores'),
(N'Navarro'),(N'Medina'),(N'Paredes'),(N'Salazar'),(N'Delgado'),(N'Torres'),
(N'Rojas'),(N'Cabrera');

CREATE TABLE #Domains (Id int IDENTITY(1,1) PRIMARY KEY, Val nvarchar(50));
INSERT #Domains(Val) VALUES
(N'gmail.com'),(N'outlook.com'),(N'yahoo.com'),(N'example.com'),(N'live.com'),(N'hotmail.com');

CREATE TABLE #Streets (Id int IDENTITY(1,1) PRIMARY KEY, Val nvarchar(80));
INSERT #Streets(Val) VALUES
(N'Av. Libertad'),(N'Calle Principal'),(N'Av. Amazonas'),(N'Calle 10 de Agosto'),
(N'Av. Los Shyris'),(N'Calle Colón'),(N'Av. Universitaria'),(N'Calle San Martín');

CREATE TABLE #Cities (Id int IDENTITY(1,1) PRIMARY KEY, Val nvarchar(80));
INSERT #Cities(Val) VALUES
(N'Quito'),(N'Guayaquil'),(N'Lima'),(N'Bogotá'),(N'Medellín'),(N'Arequipa'),(N'Cuenca'),(N'La Paz');

DECLARE @cFn int = (SELECT COUNT(*) FROM #FirstNames);
DECLARE @cLn int = (SELECT COUNT(*) FROM #LastNames);
DECLARE @cDm int = (SELECT COUNT(*) FROM #Domains);
DECLARE @cSt int = (SELECT COUNT(*) FROM #Streets);
DECLARE @cCt int = (SELECT COUNT(*) FROM #Cities);
DECLARE @Now date = CAST(GETDATE() AS date);

-- Tally grande
WITH Tally AS (
  SELECT TOP (1000) ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS n
  FROM sys.all_objects a CROSS JOIN sys.all_objects b
)
INSERT INTO dbo.Customers
  (Id, [Name], Email, Phone, [Address], RUC, IsActive,
   CreatedBy, UpdatedBy, CreatedDate, UpdatedDate)
SELECT
  NEWID(),
  CONCAT(fn.Val, N' ', ln.Val) AS [Name],
  CONCAT(LOWER(REPLACE(fn.Val,N' ',N'')), N'.',
         LOWER(REPLACE(ln.Val,N' ',N'')),
         RIGHT(CONVERT(varchar(36), NEWID()), 4), N'@', dm.Val) AS Email,
  CONCAT(N'09', RIGHT('00000000' + CAST(ABS(CHECKSUM(NEWID(), t.n)) % 100000000 AS varchar(8)), 8)) AS Phone,
  CONCAT(st.Val, N' ', (ABS(CHECKSUM(NEWID(), t.n*11)) % 999), N', ', ct.Val) AS [Address],
  CONCAT('1', RIGHT('000000000' + CAST(ABS(CHECKSUM(NEWID(), t.n*13)) % 1000000000 AS varchar(9)), 9)) AS RUC,
  CASE WHEN ABS(CHECKSUM(NEWID(), t.n*17)) % 10 = 0 THEN 0 ELSE 1 END AS IsActive,
  N'seed-plan-2025-v2',
  NULL,
  DATEADD(SECOND, ABS(CHECKSUM(NEWID(), t.n*19)) % 86400,
      DATEADD(DAY,
          ABS(CHECKSUM(NEWID(), t.n*23)) % (DATEDIFF(DAY, p.MonthStart,
              IIF(EOMONTH(p.MonthStart) > @Now, @Now, EOMONTH(p.MonthStart))) + 1),
          CAST(p.MonthStart AS datetime2(3))
      )
  ),
  NULL
FROM @Plan p
JOIN Tally t ON t.n <= p.Qty
-- índices aleatorios por fila
CROSS APPLY (SELECT (ABS(CHECKSUM(NEWID(), t.n, 1)) % @cFn) + 1 AS Id) rfn
CROSS APPLY (SELECT (ABS(CHECKSUM(NEWID(), t.n, 2)) % @cLn) + 1 AS Id) rln
CROSS APPLY (SELECT (ABS(CHECKSUM(NEWID(), t.n, 3)) % @cDm) + 1 AS Id) rdm
CROSS APPLY (SELECT (ABS(CHECKSUM(NEWID(), t.n, 4)) % @cSt) + 1 AS Id) rst
CROSS APPLY (SELECT (ABS(CHECKSUM(NEWID(), t.n, 5)) % @cCt) + 1 AS Id) rct
JOIN #FirstNames fn ON fn.Id = rfn.Id
JOIN #LastNames  ln ON ln.Id  = rln.Id
JOIN #Domains   dm ON dm.Id  = rdm.Id
JOIN #Streets   st ON st.Id  = rst.Id
JOIN #Cities    ct ON ct.Id  = rct.Id;

COMMIT;
END TRY
BEGIN CATCH
  IF @@TRANCOUNT > 0 ROLLBACK;
  THROW;
END CATCH;

-- Verificación rápida:
-- SELECT CONVERT(char(7), CreatedDate, 120) Mes, COUNT(*) Cant
-- FROM dbo.Customers
-- WHERE CreatedDate >= '2025-01-01' AND CreatedDate < '2025-08-01'
-- GROUP BY CONVERT(char(7), CreatedDate, 120)
-- ORDER BY Mes;
