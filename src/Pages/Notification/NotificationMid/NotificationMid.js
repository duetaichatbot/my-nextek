import React from "react";
import style from "./notificationmid.module.css";
import { useState } from "react";

const Notification = [
  {
    notifications:
      "delectus cumque assumenda nostrum animi tenetur et qui veniam ducimus. Qui.",
  },
  {
    notifications:
      "delectus cumque assumenda nostrum animi tenetur et qui veniam ducimus. Qui.",
  },
  {
    notifications:
      "delectus cumque assumenda nostrum animi tenetur et qui veniam ducimus. Qui.",
  },
  {
    notifications:
      "delectus cumque assumenda nostrum animi tenetur et qui veniam ducimus. Qui.",
  },
  {
    notifications:
      "delectus cumque assumenda nostrum animi tenetur et qui veniam ducimus. Qui.",
  },
];

function NotificationMid() {
  const [seeAllNoti, setSeeAllNoti] = useState(false);
  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="d-flex "
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            alignItems: "baseline",
          }}
        ></div>
        <h2 style={{ fontWeight: "700" }} className={style.noti_today}>
          Today
        </h2>
        {Notification?.map((items, index) => (
          <div
            className={`${style.scheduleCard} d-flex gap-1 py-2 mt-4`}
            style={{
              borderRadius: "10px",
              width: "fit-content",
            }}
            key={index}
          >
            <div className="d-flex flex-column gap-2">
              <span
                className={`${style.noti_namesSpan} d-flex align-items-center justify-centent-start gap-2 `}
              >
                <h2
                  className={style.name}
                  style={{ backgroundColor: `#3CC2E0` }}
                >
                  MH
                </h2>
              </span>
            </div>
            <div className={style.noti_mid}>
              <div
                className="m-0"
                style={{
                  color: "#A098AE",
                  height: "3rem",
                  overflowY: "scroll",
                }}
              >
                {items.notifications}
              </div>
            </div>
            <div
              className={`${style.scheduleRightSide} d-flex justify-content-center align-items-center gap-3`}
            >
              <span
                className={`${style.noti_TimeSpan} d-flex align-items-center gap-1 `}
              >
                <p
                  style={{ color: "#A098AE", width: "max-content" }}
                  className={`${style.scheduleTimes} m-0 `}
                >
                  10.00 AM
                </p>
              </span>
            </div>
          </div>
        ))}
        <div
          style={{
            width: "57rem",
            position: "relative",
            marginTop: "1rem",
          }}
          className={style.AllNotificationBtn}
        >
          {seeAllNoti === false && Notification ? (
            <button
              style={{
                position: "absolute",
                right: "0",
              }}
              onClick={() => setSeeAllNoti(true)}
              className={style.noti_btn}
            >
              All Notification
            </button>
          ) : (
            <button
              style={{
                position: "absolute",
                right: "0",
              }}
              onClick={() => setSeeAllNoti(false)}
              className={style.noti_btn}
            >
              Close
            </button>
          )}
        </div>
        {seeAllNoti && (
          <>
            <h2
              style={{ fontWeight: "700", color: "black" }}
              className={style.noti_allNoti}
            >
              All Notification
            </h2>
            {Notification?.map((items, index) => (
              <div
                className={`${style.scheduleCard} d-flex gap-1 py-2 mt-4`}
                style={{
                  borderRadius: "10px",
                  width: "fit-content",
                }}
                key={index}
              >
                <div className="d-flex flex-column gap-2">
                  <span
                    className={`${style.noti_namesSpan} d-flex align-items-center justify-centent-start gap-2 `}
                  >
                    <h2
                      className={style.name}
                      style={{ backgroundColor: `#3CC2E0` }}
                    >
                      MH
                    </h2>
                  </span>
                </div>
                <div className={style.noti_mid}>
                  <p
                    className="m-0"
                    style={{
                      color: "#A098AE",
                      height: "3rem",
                      overflowY: "scroll",
                    }}
                    dangerouslySetInnerHTML={{ __html: items.notifications }}
                  >
                    {/* {items.notifications} */}
                  </p>
                </div>
                <div
                  className={`${style.scheduleRightSide} d-flex justify-content-center align-items-center gap-3`}
                >
                  <span
                    className={`${style.noti_TimeSpan} d-flex align-items-center gap-1 `}
                  >
                    <p
                      style={{ color: "#A098AE", width: "max-content" }}
                      className={`${style.scheduleTimes} m-0 `}
                    >
                      100:00 AM
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </>
  );
}

export default NotificationMid;
