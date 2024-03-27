-- ** WorkBench SCHEMAS(좌측 목록)에서 Stored Prcedures에서 우클릭
-- ** Create Stored Procedures 클릭
-- ** 양식에 맞게 작성하고 오른쪽 하단 Apply 클릭


CREATE `SP_REGISTER_USER`(IN uid VARCHAR(100), IN userid VARCHAR(255), IN userpw VARCHAR(255), IN salt VARCHAR(255), IN user_name VARCHAR(255), IN user_email VARCHAR(50), IN user_role VARCHAR(1), IN user_type VARCHAR(1), IN youthAge_code VARCHAR(1), IN parentsAge_code VARCHAR(1), IN sex_class_code VARCHAR(1), IN emd_class_code VARCHAR(2),  IN temp VARCHAR(50))
BEGIN
	INSERT INTO webdb.tb_user(uid, userid, userpw, salt, user_name, user_email, user_role, user_type, youthAge_code, parentsAge_code, sex_class_code, emd_class_code, token_temp) VALUE (uid, userid, userpw, salt, user_name, user_email, user_role, user_type, youthAge_code, parentsAge_code, sex_class_code, emd_class_code, temp);
END


CREATE  `SP_GET_USER_BY_ID`(IN ID VARCHAR(255))
BEGIN
    SELECT u.uid, u.userid, u.user_name, u.user_type, u.youthAge_code, u.parentsAge_code, u.sex_class_code, u.emd_class_code, u.user_email, u.fig
    FROM webdb.tb_user u
    WHERE u.uid = ID AND u.user_role = 0;
END


CREATE `SP_GET_SCRAPPED_POLICY`(IN ID VARCHAR(100))
BEGIN
	SELECT webdb.tb_policy.*
	FROM webdb.tb_policy_scrap
	INNER JOIN webdb.tb_policy
	ON webdb.tb_policy_scrap.policy_uid = webdb.tb_policy.uid
	WHERE webdb.tb_policy_scrap.user_uid = ID;
END

CREATE DEFINER=`webservice`@`%` PROCEDURE `SP_GIVE_FIG_FOR_ATTENDANCE`(IN USER_ID VARCHAR(100))
BEGIN
    INSERT INTO tb_event_part (eid, uid)
    VALUES ('1', USER_ID);
    
    INSERT INTO tb_attendance_logs (user_uid, attendance_date, attendance_time)
    VALUES (USER_ID, CURDATE(), CURTIME());

    UPDATE tb_user
    SET fig = fig + (
        SELECT tb_event.fig_payment
        FROM tb_event
        WHERE eid = '1'
    )
    WHERE uid = USER_ID;
END

CREATE DEFINER=`webservice`@`%` PROCEDURE `SP_GIVE_FIG_FOR_INVITATION`(IN invitee_uid VARCHAR(100), IN invite_code VARCHAR(8))
BEGIN
    DECLARE inviter_uid VARCHAR(100);
    DECLARE inviter_count INT;
    DECLARE code_valid INT DEFAULT 1; -- 유효한 코드 여부
    
    -- inviter_uid 찾기
    SELECT uid INTO inviter_uid
    FROM tb_user
    WHERE substring(uid, 1, 8) = invite_code
    LIMIT 1;
    
    -- invite_code로 inviter_uid를 찾을 수 없을 때
    IF inviter_uid IS NULL THEN
        SET code_valid = 0; -- 유효하지 않은 코드
    END IF;
    
    -- 본인 코드 입력인 경우
    IF inviter_uid = invitee_uid THEN
        SET inviter_uid = NULL;
        SET code_valid = 0; -- 유효하지 않은 코드
    END IF;
    
    -- 초대 인원수 확인
    SELECT COUNT(*) INTO inviter_count
    FROM tb_event_part
    WHERE uid = inviter_uid AND eid = '5';
    
    -- 초대자 인원수가 3명을 초과하는 경우
    IF inviter_count > 3 THEN
        SET inviter_uid = NULL;
        SET code_valid = 0; -- 유효하지 않은 코드
    END IF;
    
    IF code_valid = 1 THEN
        -- 이벤트 내역 추가
		INSERT INTO tb_event_part (eid, uid)
        VALUES (5, inviter_uid), (6, invitee_uid);
        
        -- 초대자 inviter에게 무화과 지급
        UPDATE tb_user
        SET fig = fig + (
            SELECT tb_event.fig_payment
            FROM tb_event
            WHERE eid = '5'
        )
        WHERE uid = inviter_uid;
        
        -- 초대받은 사람 invitee에게 무화과 지급
        UPDATE tb_user
        SET fig = fig + (
            SELECT tb_event.fig_payment
            FROM tb_event
            WHERE eid = '6'
        )
        WHERE uid = invitee_uid;
	
    END IF;
    
    -- code_valid 반환
    SELECT code_valid;
END

CREATE DEFINER=`webservice`@`%` PROCEDURE `SP_GIVE_FIG_FOR_WEEKLY_FIG_CHALLENGE`(IN USER_ID VARCHAR(100), IN EVENT_ID VARCHAR(100))
BEGIN
	INSERT INTO tb_event_part (eid, uid)
		VALUES (EVENT_ID, USER_ID);

		UPDATE tb_user
		SET fig = fig + (
			SELECT tb_event.fig_payment
			FROM tb_event
			WHERE eid = EVENT_ID
		)
		WHERE uid = USER_ID;
END