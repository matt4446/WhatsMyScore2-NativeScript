import {NxCard} from "./card/card.control";
import {NxContent} from "./content/content.control";
import {NxDrawer} from "./drawer/drawer";
import {MaterialFab} from "./fab/fab.component";
import {IonIcon,AlignLeft,AlignRight,NavIcon} from "./icons/ion-icon";
import {MaterialIcon} from "./icons/material-icon";

import {NxHeader} from "./list/header";
import {NxListItem} from "./list/list-item";
import {NxList} from "./list/list";
import {NxNavBack} from "./nav/nav-back";
import {NxTitle} from "./nav/nav-title";
import {NxNav} from "./nav/nav";
import {Paralax,ParallaxCollapsableItem,ParallaxExpandableItem} from "./parallax/parallax";
import {NxPullToRefresh, NxPullToRefreshView, PullToRefreshAnimateElement} from "./pullToRefresh/pullToRefresh.control";

export var controls = [
    NxCard,
    NxContent,
    NxDrawer,
    MaterialFab,
    MaterialIcon,
    IonIcon, AlignLeft,AlignRight,NavIcon,

    NxHeader,
    NxListItem,
    NxList,
    NxNavBack,
    NxTitle,
    NxNav,
    Paralax, ParallaxCollapsableItem, ParallaxExpandableItem,
    NxPullToRefresh, NxPullToRefreshView, PullToRefreshAnimateElement
];