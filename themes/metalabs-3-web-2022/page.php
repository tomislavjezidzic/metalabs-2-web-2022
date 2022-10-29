<?php
// If there is no post, include home page
wp_safe_redirect( get_home_url() );
exit;
