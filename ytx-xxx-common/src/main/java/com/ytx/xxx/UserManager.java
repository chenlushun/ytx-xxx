package com.ytx.xxx;


import java.util.List;

/**
 * Created by Alex on 2017/8/5.
 *
 * @author Alex
 */
public interface UserManager {

    List<User> findByNickName(String nickName);
}
