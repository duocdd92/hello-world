CREATE DEFINER=`aircrew_admin`@`%` PROCEDURE `getProfile`(IN usrId int, IN dId char(50), IN extendedProfile bool)
BEGIN
SET SESSION group_concat_max_len = 1000000;
SET @usr = usrId;
SET @device = dId;
SET @sql = '';

SET @select = '
	SELECT u.userId,
    u.accountEmail,
    u.firstName, u.lastName,
    u.picture, u.thumbnail,
    u.uuid, u.companyId,
    c.name AS companyName,
    u.interfaceId,
    u.verified,
    u._deleted
';

SET @from = 'FROM users u LEFT JOIN companies c ON c.icao = u.companyId';
SET @where = 'WHERE u.userId = ?';
SET @limit = 'LIMIT 1;';

IF @device IS NOT NULL THEN
	SET @extSelect = 'd.deviceId, d.apiToken AS token';
	SET @extFrom = 'LEFT JOIN users_devices d ON d.userId = u.userId AND d.deviceId = ?';
	
	SET @select = CONCAT(@select, ', ', @extSelect);
	SET @from = CONCAT(@from, ' ', @extFrom);
END IF;

IF extendedProfile = true THEN
	SET @extSelect = '
		u.role, r.roleName, r.rights, r.level,
		getModules(u.userId, u.companyId) AS modules,
		getDevices(u.userId) AS devices
	';

	SET @extFrom = '
		LEFT JOIN map_roles r ON r.role = u.role
	';
	
	SET @select = CONCAT(@select, ', ', @extSelect);
	SET @from = CONCAT(@from, ' ', @extFrom);
END IF;

SET @sql = CONCAT(@sql, ' ', @select);
SET @sql = CONCAT(@sql, ' ', @from);
SET @sql = CONCAT(@sql, ' ', @where);
SET @sql = CONCAT(@sql, ' ', @limit);

PREPARE stmt FROM @sql;
IF @device IS NOT NULL THEN
	EXECUTE stmt USING @device, @usr;
ELSE
	EXECUTE stmt USING @usr;
END IF;
DEALLOCATE PREPARE stmt;

END