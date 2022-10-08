export default (myStats, targetStats) => (`
    <div>
        <div class="title-black top-round">Stats comparison</div>
        <div class="cont bottom-round ">
            <div class="profile-container personal-info">
                <ul class="info-table">
                    <li>
                        <div class="user-information-section"><span class="bold">Xanax taken</span></div>
                        <div class="user-info-value"><span>${targetStats.xantaken} vs ${myStats.xantaken} (you)</span></div>
                    </li>
                    <li>
                        <div class="user-information-section"><span class="bold">User activity</span></div>
                        <div class="user-info-value"><span>${targetStats.useractivity} vs ${myStats.useractivity} (you)</span></div>
                    </li>
                    <li>
                        <div class="user-information-section"><span class="bold">Best damage</span></div>
                        <div class="user-info-value"><span>${targetStats.bestdamage} vs ${myStats.bestdamage} (you)</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
`) 