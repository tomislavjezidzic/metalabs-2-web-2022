<?php

use metalabs3Web2022\helpers\NavigationHelper;
use metalabs3Web2022\menus\Menus;

$menus             = new Menus();
$menu_items        = $menus->get_nav_menu_items_by_location( $menus::HEADER_MENU_LOCATION );
$navigation_helper = new NavigationHelper();
?>
    <!-- NAVIGATION -->
    <nav class="c-navigation-wrapper">
        <nav class="c-navigation js-navigation">
            <a class="c-navigation__logo">
				<?= get_icon( 'logo' ); ?>
            </a>

			<?php if ( ! empty( $menu_items ) ) { ?>
                <ul class="c-navigation__list u-b3">
					<?php foreach ( $menu_items as $menu_item ) {
						$target = ! empty( $menu_item->target ) ? 'target="' . $menu_item->target . '"' : '';
						?>
                        <li class="c-navigation__item">
                            <a href="<?= esc_url( $menu_item->url ); ?>"
                               class="c-navigation__link <?= esc_attr( $navigation_helper->get_is_active_class( $menu_item->object_id ) ); ?>" <?= esc_attr( $target ); ?>>
								<?= esc_html( $menu_item->title ); ?>
                            </a>
                        </li>
					<?php } ?>
                </ul>
			<?php } ?>
        </nav>
    </nav>
    <!-- //NAVIGATION -->

<?php
get_partial( 'layout/mobile-navigation' );

