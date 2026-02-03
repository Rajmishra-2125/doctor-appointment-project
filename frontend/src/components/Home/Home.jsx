import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section
        className="bg-linear-to-r from-blue-600 to-green-400 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Health, Our Priority
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Book appointments with top doctors in seconds. Quality healthcare
              at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              src="/doctors/appointments"
              onClick={{}}
              className="border-2 bg-white border-white hover:text-white text-blue-600 hover:bg-blue-600  px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                <span className="mr-2">Book Appointment</span>
              </button>
              <button 
              onClick={{}}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                <i className="mr-2"></i>Find Doctors
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAABfVBMVEUps2/////x8/f/1q4YDwre3t82IhnwWC/W1tj8/P3qt37WTjwAAAAXAAAArmMfsWv5/ftRVYec2Ldsxpb/3LMgISXn6OsquXPk5OPr9/Dh8ujZ7+LN6dmi2bu/5dF4yZ1cwItGu3+z4MhdYY42HRY3AAfh3cvmVjaSlJOJi4o3FhMqGxOI0KgsFw9zdpymqLzxUSIllFwno2UZIxUaMh8cRSsgbEM3Dg9LPjLryKMdTzGsknbYqHRgW5D3yJhnapTop6DUPCTR09+1uMq5urqrrKsSExkjhlQeWTcve00uZ0E0NiQyVDYZGRA0SjBjUkM1KyOFb1rAoILZtpSWf2ZNNihhRTCIZ0ibeFVAKBjCl2jSvIWthlyktXd/tHRUs2/KyZXezJ+WxokzpnU1hH3XvadPfIW3yJr74slfo44xlnGPlaWblrhTbYezysQ+lXzryL87QHPhkoXUbGHVs7HaYFHubVHqeF5+gZvpgnBudYJPWXVFRUdlZ2lZYG8zQH6JAAAOvElEQVR4nL2ci3/TRhLHZSUiknEky0lkO3Gc2AZq02BCGmhDCQFHDs+WV7m7lhZ6hdJeHdqQckDcwt9+uytptU9p17Q3nxZiEq2+mfntzKy0klH4MCvXF5cajXZ7uQJsud1uNJYW6+UPHNT4gGPrzcrKasswPJcwzzBaqyuVZv3/D1VvLM9BFg8w8Oahb80tNyYkmwSq3F5pea4Qh0JzvdZKe5JQakMttlddMVC1Gv9VJcHc1fbi3wzVWDGkRNeun9/c3Dx/8cY5g8ACXMZK4++DqrdbsqBVz12fTe2TCxskFuBqLevISx2qXmnRsq4ii76+MD07nRrEMmgsr1VRx1KFqi8bLu0b49yNmzcvnENfnieRIq7NcxSVAQ5XxlKEWm55DNKNWydOAztx26hu8EyAavoGQ2V4reW/EKrZor0EJHTr5IljyD69vbEpYIJYF1gqw201/yKo+hybIqvXTsdI0D4RMwmpPG9OIYb5UMtc1q5e+zRFOvaxBAlScRGEWPkxzINanHPZYasbpwmmY3ImQMWqHcVwLi+b5kA1DUFi+vK0mqPgHOSPBs4ycpSVCVVeEyRLIChVRwllhZy1llkSs6DqfOgg1K0T6lDTsxsiKBDCLL1nQC2JQgeywcljqtGDUNeFrgJDL00CJZQTgLqpET1gn4hdlSksKdSyKHTANqjo5TlKqioYQmlukEFVJEzGuWM60QP2hQzKcCt6UFImOnHmRw9KXU61pgMlZWIkpeCojPhJfSWEkjMZ1S9P6DlqevaidDAZlQhKpnEEdVcbalMy/yIqkdoFUM0MJqN6UjN6wM5ljGe4gszAQy1lDUFDKXlqevaaXFTQ+CzKQdXFOTOxDRLqwZ0StLufAbsLvpgIyjO4isNCleeyF5kE1Oz9+a2v7ty7/2AL2YP796aFXLJKg6nm2OrMQq1lCQr2UhjqzJ2pqal5aFOxzc9DLh7qYjYUn64YqEyRM1APMA22+akH9zhvzd7OgeLETkMtii9YEIahztzjmRAXEBoDtZkH5XmLGVA5goJ2MsNREdXWvZImFJCVHCorazJQMkchrM9LmlBMDiWh6vl+wi3emftyqKn5+7pQhleXQCkEr3ojbhLObMmZGKrc2Yeg5sRQzXwmw7gdl76HGY5CVCU9KMNrCqFaKlBxk3DmTjbU1PxXmGr2phJUSwSlonIMNftVDtTUFJ6DonWywAitY6h6S+XIpMebzdJ55Kqtj0tKtQ9bq85BLasED8++bJ3TsprNbF1S8yosVF3tQKMazb6H+VA4gF9kNXkUVZ2ByuiAaSi0wkLFONdVW3GaUoXCvbGhoygIhXLCmXsKUFPzqArOnlccOlVVDNVWUhSCOp1TZAgopKrMhQNtXpuCUspRCOoigsrPCNC2SsppKoJqkVANRUUldUYV6rNS9rqPNbdBQK2oOgos25GnPleCmoKiKmlAeSsp1KLyUaDLu3vmaw2o0t1/qCX02BYxVFs5esA2/3npX7PKUA8vFdWjAOLXxlCrOsedv1S89LUa1Nad0jdFLShvNYEq6ziqev2b4qWHqkL/+JIelOGWYyit6FWvQU+pQk1reiqKn6E396AVi9+oCv1e6dviI63R0fwzNEpMfFixWMxtXCKbn/r2UvE7vV8ZlhoA1dA7ynsEqJSYgIEffaw1uuE1EJRay5naY3Woy8Xioyd6o8MG1FBaxFD2BEBdVofSGxwtawCUJpNhfKcMBfCf6A7vQqi6ZvQMOP8eKSn9+6KuzCFUHUDlXWjhzXvy3ZOfFJjmW481VY6gmgBKtRFmuBSg/u1lXxWUQFUAlGbqTKi+z4f6YbKRVwpGWasap4c+VnHURCOvlg3NfJ4em+eq+ceTQYGcbug0ePSxOVA/TcgEGj0j+7J5hnk/ZDtq0nENgKRZ+VJ7+uzHrGQ1afBg9TPUFzKkVZ8+72x3MtbuP+Vv+pKZ2zC0Ojxsz7a3/f5uTeqqn83Gf355OkmagtlzMqhn2x1/ZNUsS8oEbP/li2eezkomgWobuo0LtBfb/otfAVLNPCWszJdPOQDKGXS2d37Rp3KXDf0qU3227T+HTIFpnhL1C8XiKSem8jv6VG5FHwoxNSxgJoTiGj7QQ0EoSGUGO/72b9q9ywRQG9udF79aBFTx8mUaKYUyrZ3Otub4E0E973Rg7AioCAxY8iGFcgK/81wfSlPo3tNOZxQx1Ugo2jCU6ZztbP+mJysgdL2U4LkvtncGFoYSU/1cwFCm2e90XK1zgJSgAeV57lzT98/WCCizJvZTCrXr+7+uSDYZi6Ga6mUG7SB1zvq+bZFQprlFI02VHQrKAb9Gob4s3bfKQzUUCzJw0moTnuKt348dhYSO7GcudBTUvt834b7sOYVN0OhcDaXWBTipsojOAtLhLgdl1vC8u1xLmDCUOfA7g+gSdEXJXd5SfpPned5qs44FspNEj4AyzR9jNzmp4e+BDDpIbiE0V718dS3mtcPASWuLeHznrf/WEkGZNaCsrdRNJJTZB6LCtpTrLtAOZy4cPGO1TZ7a6eC5x0CZzsEBiURCAVEVCCu3V7N6GrhwyFhiuV6lQZ3YDHxCUjTUwdWrNFWKe9bvFGhbqnjSSQ+XWNLFqOcRccOa9Qfi8F25evz41SvC8DkgUxVYq6/JtIUWo5Jlu2c0WST4O/upo2DrQjLRVMRRg5cvTY5KthExWraLL3B4LQ4pUocQ6hAxAapDPiOAKfvSPxs4vLPEVOgCh/BSkNfiQgftrb9PQOH4JUyQioVyBn2/0/H9twOOSpyNXOlFM3dJxBT0ycmHoazfj6dQQYGGAoLyd/qAyt/lqJYEQYovmgmaF7ciYjIDMp9jqMB+haGO23ZMlTLt7AZmsOt3yGwV2xrvj/jyoqD6tepCKFgwLBYqsG0Lx++VDagIKFCW+uAvcH7gZd5XgswdX4jlvyNxFAcVREzA/hsx/Y4+mLidcvp+H/4QVHmw0+lwk5DfrhVfsubTpyt2FF35YiiEYV9JHQWpEkeB4A3MGKoAvLbPuYqFSi7uc7dBxOkApak+C2VFGPbMR8Bm4g9WIYYCjY6DoQr7Pu8q9pYsvg3C3jBy1yRQIE1ZlMXBs+1X6zPA1mNPAVdFcgMTw0yhAoGq2HqCbxixt9Y8PpdHQ4MeoUZDJY46jKCuJK5yYg3uDKJDEYDT5ycgU0/SW2ts/MSJk21coNViCPsogjpMPgexpPoBAVUA4WcT+yI9y4ibkHRq9VbFTHAuMVCJo+zXM8jeUFAOC7WLGmPamCilt2vp+edJEgKE2q8JoQ4ippmPEihTArXDQVGiIm9s01sA3IYMaoeuMilUpHNS6YmmWE9xdZk5NQFFzUxXwmSaMijrMIGKlZ4UoDhNpZp6yzcLBBS9WYLcViKVlGl2OKiIynqTQB1ahM5RVxGndngS6GmOiewHmG0lRKlxl/WhYqaZmdcWET3UcwYpFF5rUUb0A8wGHEJvnkxScigbQ62TkkLZcz+F2vd3+OgR/QC7VYnY1CXpELKgXqVQB/BzsqBHa4ZBIiqQ5gTRA0HCVOymLrz9zZuTMomgrDSfp0pPjwj6nTCBqnWHglY9FRW//Q2rKkNSEVStFgQBDXWUQh2mcw+5yur1EqiwZ4uYsKgEGwWT74kb4QRqN/6KdtWbGQz1hph7iGXYC0HkYPS6XaGjCovxiQVbKuNc5RlyJggVl38a6iMMNfOahnIKQcJi9oZCJsBA5igGCm3T9VYyoc5GUDUKKtU5sANSUtBVSdQsSfTi9lOyTRdVQLetAkVL/QoBBZReIw8Brup10ehhL5BAwSYlrno8FEoLGZLCUAEFZR2RUIeUo2CC6kY0YU8sqfihGNnWb6h1SSccnWAn1hSTFQhJzay/DuiDcPyGEp2DzrflyTfJg5Qh64Sh2WGnM7J5KHuGMgbKAWIKs6GAqDIeJwCzsy3z0mDcHf3xxx/jke0w0bNInc+ss0fCpOlkQzXdrAcvCm1JJ2wOx9bZEVgoDEejkIEKaE2VWShz2A2yoept+jP7MI+48Dm7Y3MwQl8Nw9EuU2sOSKgD9tCCM+zVQO4cDgXVOLK8J4zY3zOy4L1t9iKxBGNzzCr9TVpm3nBMUOlAVGY3hQILMxKQeyaZe0BMSLU7dgBKDFUYDZgAXiEKMs8UZapaN0xOYf1ZKvVSqnI+lJCqFzomUDg8Szgq2CNG60EaPnyIheZpNGS3ZxVsnNDNhb2FhRKuOTyT6KFDAdQYQAXjgeM41jgwrRGTP4O0R088FP658M5KvAHjF0JhRYilBQDVxVA8gejxTF7sPZjJg9F4NIJqD+EfFFVSknHmtEt7wB8Jhtnt1rrdGDFYgFZKgil6nFz4ICsHNYwEFUSXOUehyVLFy/bDxFFD6I29d6mrhr2Ewl7Y2yuVEkThI+7iR35ZKPv9gPgwrpksVdSlr+NsHpaQO7BwuriBCXu9P98Nk9osfuxe8nA0A1Xrvg/wVcz3YdwHEFQoga4fpZPkXWlvb28BCDyyYRfMFYjU7XVrJp55kvcvyR4jp6GC2uh9iC4bmiFgwg4hEij0FNEHF8Luu3c9gGCD7tkegvD1et0u+D8kTiJ7aYL0gXta7ZYVvh+PQDYfj8OaRf57Ykfr60fpv6P+13RqQ4gCWIZmEMKvbLLUSF+ZIH81AUUVgPVCCOre0K5RdxrSHtReX0+7O8LjdjgchtE0NKk6I8hP+VB0FgX6geevMUypsIKjN8kBTI1zhDUvgynzdRfluuDsTLuUUuE2WFp3VZlyXgwiXyyLfKXBlP3GmZxXqIibBtZiYSkzZbopH0rLWdBVCki5TPmv5SkrOSuiUnRT7mvOFF5gpOYsGELZwo40lZfoKb3qSQkLOis3evleUoZSphLc/6SHUXtBnerrw8p1Ba5aZgAVxKQJpeatwJKvWDTeyKjzSjoFbwUSV9WVvaQLBSOQiyVwVVk9cJNAqXA53M9rv35xohdCZoeRXNFNQDQhFDpdBpiToGtG7UOhYjAZFfTQB7z+9AOgIgNtO/gvvs4QmOj2/4eO+T/+qQT1jNFeQgAAAABJRU5ErkJggg=="
                  class="text-blue-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p class="text-gray-600">Expert Doctors</p>
            </div>
            <div class="text-center">
              <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src="data:image/png;base64,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"
                  class=" text-green-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p class="text-gray-600">Happy Patients</p>
            </div>
            <div class="text-center">
              <div class="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABblBMVEX///86LGFtyfj5dZ3m5+n///3/1+U0JFw6K2L7/P3f4eioo7IrGls7KGFqxfFSfaw5IVtwZ4fU+/+V1Pc2LV7/d59GLWZuyfg1IFd1z/9elcWfUn9irdtvy/5ObJphp9Rpt+Y2L2Xy8/Q3GFbq7epLP2rpb5u16vd7zfAvJmEyKF2Ri6OUTXlQMGVTNmciCVOIS3jAvssoE1ceAFHIx8wrGlUmFVSFgJX/dKL4d5pHPWZ4cYpkW3/w7PC3sr9aUXKGfpnZ1N+sqLmRiqW8W4spKVsmJVw2ImRANWJlXIPn7ubOythYTXpzb4/DusuYlauUkZ8eAFeAd5kqDVphW3YXAEfl3eprYIa1tL4eCkhGNnGuq8LJv9FMPm6dkq6p3vWCkKtmN2qCPnO4ZYzLZIt6SHPe/fftcZ+77/W2U4msW4HOX5PsdpqVSn1oPHNIW4g3QHFIZ5v4hab5q8P8wNP6zN32l7VUeqxvte5Md59dCSNIAAAdZ0lEQVR4nN2di1vbRrbANdizMzYaYu8dgQmhAWHYSgQMMlJswAYTbMzaidO0adLN0l5SWHYT0qSPbW7/+3tmJPltA7aInZ6vXwtYdvXzOXMeM2dGijIegrGiJ/Go7+I2BeNJe/dPTajvWtbBqG8iWME4EhG2KfSGlegRYUQf9T0FKziyXV7NKa5hFoiJyEPlz2WlWE9R2zPMimpSlCrgPxehEuEUIetYV3AlTRGl26O+oeBllyBEbR6tOFT8UBv1/QQv+0CIuInAQoHQ2nL/qofDo72tAEQ4UDHkNh0kRQAibueET1XC4fDn71IFXq5S29mmqEnY3sN8QU/+PRz+E/ibaG3XtmzSAki5GbNTJF6LRkZ9e8OI0F508iilttI1cRI7vZcXUfIzjRwYV+K22h3OF04ssh/9XAmfVFMEQRjk/Qg5eJ3U4+io7/XGAirZOrFIf/01hKTjQo+fkSbBez62zOvygTDDrkU+J0LlIHHUw7t0FUopcrYLo77r6wrG+m7qBni+kOe1z8WpFlCMDUCImLOrfxaEBxb3crMbCmcxPv6WipXV9CB0nhDrybgbKn5oDc4HQr/LjznhY6dffL8OYurVqBn6CAbA4fgkYn6MDXV1OBN1CWmqMmqOnjKZGsLJNAiZNZ5pKlYq6eH5pDA+noV/bqAg2FWM48g4jsTda5cSVwqzauNW+8M3XnMCU6GcixszQ8U4nKIBEiJSHbNJOKzESXDDEMkp4+RYIeLNACJhq3wdHauJxsj2QPVSPyH7yXGaDs9bQ6ajnULtQjI5ai5PIIs8CnQQukKeJcfF22DlyfAJdxcxC+HwmIRFvEf6TooOKOrTcVmZwoVBJp6uFnqUHJelqX37VgiRk0+Oh51GysbtEJLHyfFwNltW4MHQR4yGx0KJD+3gQ4Ur0kxzo+ZTFPO2AJENec3IlYhxNKjSHiJg2+90OTf6lX6s5AMK99T4dq+9iI5B0B91TMTKo4Bq+3Slc6bn65fhkSsR4y6zF9Svhmm/srg1DZItYfGmzxLvVVeTI1cilu1cvYS2JXOUdP8ZAGWTVJg03gCElDzWw6P2NTj3XReyE++/7LgFn1i1evpDys0Ks/bdVsV849MEobmsj9xMcaHT0dDypAThdm21QcGRuhyO+nMBBOUe1l+jzo73acqO2mLYlp4cOeFmJyF56hLSmNKgQNR6GPFnOyjhYWWn/pr10JuwwDhSbem+SYmsZsQDMd+Zdqd12aZHrbzyzKegNhPNet+7V9t7uhI58d1Rqt5NixWsV5s/0JLhYrQzNpPtPUHgHhQZ2Oy4onwjUREy7FXccLypVfjxW6FOBn7Kau3EjMSbVuisSnLkA7HWrkNuRSNl0UNKcor8AaGjVPxbca1LpfJNobP9I3ExIvaT1g/EykOrbqjO5hgSxuJK2AYtpIFDOBZqp6tb3pLgrgm/1XTZ8SZ1T9WTaOtqoeh2z9cRLZdwpFNS7YTU+Vb2kjr78OLkV3Zq+1HUu3XlUcoyazn3lz3wKPzIqXUZYlgp+C7X0+FIXU07IXmGhQe14+LWJ1dfRiNuBy38+5Udz0e8DQn5FBSV1jfRbsu9Yo1gfAlpOoeVBLKruB4A6tsskrrfaIl1zohT3lRwtz0JWBlnQtGiXkg5L/xGPD3adUH30depah7+607d178FV7oQjjJvayU0q3Crj55Pwl1GcpWD/b2y89XLzjeF7W8qEaDaSZPyN6v5gh5p1uU4E1JLDKyXUUjId8opxzYIYma18016WHa4556LxMe2HOfk4PPQIU3n/Rs9SCPKGCW28zzf661YeZxWbYNC1KfPw81/byccaTt4EyGz9+ua2EyrjkW247XNaM+UC9RYyK/ubhNLVW39c9Bh4rjhMHD+6cuCG/p6E7qvRcKVyafN26DGlJBxst3eQeHuJumbNnd7fUwJoWTPtd0s+FO9nw69Szo6S8aVkH6rtGeYq2VS3ey7zzBSOzGr7a5ozAgfEspjlok6gwI+diglz3vvhoUv5IUF/jZda/9qBKHtGBQ5crJtpIRRlXJ1vxAn5nL7S5tyPYPyntPyWNlKM1FFOLlOQrv2z29UZi6PnPAFoakDUex1Eq66kzX9+vBqCbk87lQ6CcX+vbhNnVfJURJinEsjKOnBVmOdVvpUFbU6T/Xu3cbeIE5tdSXEkTJicmJ/dITKgYpSIlEDwg4dVkSBhNh2z7vDuCCbwinRuxMqkza1C6Ml3CH0SOlBiJ+lCHiazX45zX4aLknnu3gaQSh6ydSXox2Hu4TIqc6uhMrB7nL8iv0F+d3tjksahBGOjh6NdIUN7zGyKn7oNg6FYvwCv+cHKF2K4CbCZXq0qo9yKgovNwg7dYivztrcS9r/2Ek4KiVi5ZiQF+44vHKHPW6a17jq0qgbLbB+xNWn4ZHOJ+4Tasv+WZv29pm++GBXEeI6YcHiflYTwM0OIjhvyVsBt47KV33NOX+Xgb7VHxHjLQvJMLpKkBstRudr9DQlYlot7yByxdccttK7Uo05Nb3X/9gPsYCTCsNwtCk7zoVHbKY2sx9hpeKgq3ZJCHXL/POJhdK5/lqEXCcNX1/VQFY+OWLCXIJRu1rbMbm12f/KlypyZO6y6aDv9P6E+wSR2qMy4YljD3CESxdbKUaZ2HJ/1WEeeZVaLqFF033bgLDc2aCCiRIWDo9ah1ABqbbs+iLx/le+dOh30jhf2izVV4c4IpqQoLa0qp6bGSkhVnJPy2kVbsjqf2XBYvak+GHXYKjvnhgIEoj+I+1UD+oaHHXLiRLRX6n8imODcJkypxaO7tjI3u/7aXhSRSSq63q4SUbc+xUJw9euTvaPAU9SiNmqYyBqhfsH/T3C9nLhVgn2hm8sWE+WKdntfw1eTVMKNT1J/bN/4hYGLa8mWwFH3mYaSa6CmV7VUfBkOe044oSIPoJlWe2t34+NCkEiFfvKeAFOMvpkM3dFXoqVZcKX22x0DNpolUjVROWrbgTj+lx+70sKKaQ++vvYAbpZWfdNynLUtRSK2C19uwlWHhOUjjbCxBiMQVdwBCED9SDU4y/CLUR4c69bj4J4JWpR8jg3XtqTgnHN5k6+m2awsm8lUK75pU2LpLe6f9BODKlbY+RhmgTblPJu6RhWVh0aO9ryLBX++T5FRcdslyuVSorH4vqYGagvYnZztcvfMY5sQ2puxSuSP3ewbFOUetTtI7ByYiC78vcxJcTbBDldZg9Bc/qeA6HeInvxeNWyIYlN17rb86TldeiP3TAUgispSno4G6WWsjlljBAiTqIp9ygmC99BSTF2XrQhWFT8+91fUqL7pmUTw4DU9ORVD93oy1BJ58ctDjYExhul4uSObi+Jw5Ertf14fH+y0DPox22q7jRsdFz2kDaL6IlO/XOww0mw8shC5CQ6tqPQlQMLqsDCYCfoTjpy9+84pdudIoI7Z7GBjnsCN0qdfPL2VOgtMgwn8DlxFQrdys0MVbyzlobS+NVtpqOBdYvvQLxzntxwKIoDpphVawIM3kYr4OeCkJ1XLwiiqW7JTW/R91SErO+bZ2YCViHGO2kSjMTs8rJBqVPNXfOwR7hmK0ZAgwfNGgxcheCoqREIIULo5BF4VJI4uMZCmhgd+j5cbpibudsEzMH/wz4OxEr/Qahaq1ii3ad6LZ96gGzE1WpL0Rt8KMxb1AnqiK1dw9xWwscWY2ZarNH3zGDkMvgmchgkQqvhFgk+IZ1UqRnU2Uzuamly0jQYlBO7m30mLPSDbQv47OUtPXm7gIKQBBUuaqpcD9ajz9IEccMpr3Y3Vry5YzqMU2LXWgz0dkoKIER/++F/gpAf/teg5ZwupHAsO9vs1Nc7B4Xm5SbRNLv73CJijyF7lNOTt61BSRibnwhG/kgAYTK6WXu8V9+eRmzL3N7dWa1N1moPd/bKxLGJ27NJ0XJ1/6ASTt5yXS/G4dQMSACEd4Cwtpuw7BgSk/iyNw9IwBxjtmqDEKOxTVjM87Mj1eLxV2H9FgEFIZsKgA5k9k4MIXEGuxhhjpVK2Y67qZkSccgLIJncU2yCpFKOasfkTjc7tTcZzSUjt3QsZNCEUpbjtXwlrOOtE9GCSE/i1ZN/lMvby7svAIlTKx7V9WglX/vG3cOHiGrsFAJMkG+dUBUbC92CZRW8KjKeRRTxuBklugdEtp2vZ3XP5BZucbZ57Ktvbunky+AJpynbbmijUBVzbaLXVtF30gZHqWf+eMP42zRi6wixssEYN7472bpWtjdiQvN8zkBOY0IN4wPV4Nzaiz4p25SrJ40CUrSMsdLbMjXPz84hS2DM+uYWTtoPmrB0eGkgY6+JUIkepxCP2Taj5vNVvansyNlo8TT72mT8Qlt5UCKME6vHosbYEHJeutTemShdaNmRljflXnvSlpDXbG4cZn48gn9rmnaxYZoUqeiGswSfmBCxUy17UWLkceumu6gIhOS41VvqMPzWQ6ELDqathbRQdmWjxJGR+n6cCanxYyaknRdpqnVb1648rKdtqfjAQcVDAHttIiMbyoQustrZtAlj9jjQ2N+VcH5+fqavTE1NzXekQYIQrYRC2tkRb5kAx3G3M5+maopfx4CeDGqsZUPZzI8GKr3NhkAyWnbDgIJcDfKpV10JpyRkf+lupdMXcKPaKVRPTfn2vn82AUvlG4407yBzDqhCoRLlYKZSNO0QFRlzntwy4cTUl1dKV0KOJOFZiasNi2w+rb3R5Yf3DEQuNQH1usjk+4QWQ9mLdfj1u+AesNeV8Mt///VK+dff2t8mCKddTZxSlHI3tIm1pwYgoo43848r3/GjOak57dCgpcNsyBMttFFCqPsiXFCE89cABMQfehFmsoclbnuNUpOtR7hSf+Z/16B8xWW6QNTc0HxCGI1zJYqsyWAAu+vwOoB//eu/e+ow88s0omWpq3z70YosId1swUJ1quw50F40CLOhuSKjqYAQu+rwWoD/6k0Y0kTqlsdiVzBqF4KEE4oTWnzru5cfDW6cZRqIc0di61u6/w7GYQgnfvjXv64G/Gu7s2kmPCwhtqwoW90OPCNlHUfTkMPV1QZB3/C9aTZztm5wZoK7sQJ5rEd3X/rl366WL7vEwzrhSpFyqyKOMSFtJ4KpBMWqkdUEEvmMJ9nXRQpBXzJCeBTH2pxuFBFDQRwsGHBe6hGGVjilZI+BY1nNq00n8XI7ukwgQYU/mae+c5FBv3iYzYgh+KAkHiV4GMpumChRjQxvqLdEGFqnHCiYuoP1dNPRZsaukjwhVGwgNd/Vxx0EfeYG/QxECm6cr4S0zMW6IXcDjCmhdmowUKO9K7b8Np1yqh5gHIYaAphL//FDoOYGfbBS7R2gGpDpwEuZS0hmrc2hc9SAM+91z3toG2LC1N4VqxBNh5pTO4cVHLWFfo0zSShy7ix4JlY6DIlAyM3DTN1dMXYy9BRcwNVTnfANZNDOnrw7vWGkJC7nKQoJAoQrfoDPXmyAV4HweFYSJXTG120G0nD7UW5IxICttBzy3MfbEhRLnp9oOp/tibsmHo7HkKHJazXt8p0pDgGxD7MMqgyRyfkuaGUasa8LQy5HdRLecG64cbmwUnr0JqSBDqAMRqrXX4MrnplCEHcdB1Z2EnRdcGS1ywd2iVFW/OmtqJyaszfwsYcGj71IDndqWxfCm8h8GyGE7vJhVoPbbDwYF3tHm4mjpLy/KFUTQjxUvxcPjOIiMkrrbzXtrEgX14C5TqhltZ8M7jwZ7pz9DsLZhXs3kPsL882ECC0iVpqGQgHKC38vDcar3gET/qNycYQgY07YJ4ea3iytnQnneWoK71MfhVLOTET2ckN5m3bC+S+Wbib3W8YhXytSSovsMnNuIOZrzD9i0d/Hh3OpRXKovbFNRFnp9Ec5Hs8Mbp5roVbRNgwqjm4bYii2Ec5MMUZvICjxx2yDMMHKK28gtRa3OldCaa8UVPJekW/7hBWHmmchxMqotH4oB25GOy+i4kq2jTB7UaRkd6hD6Nt1OAM6jF1TfTFxZasORdiGdKs0lwHPn4p6hAeelTr+jR7YFK1kTk3GD13HqWVWQIWvs5lQO+JrE6UrwyxMdY7De/dvIguzLYTTotpj3L4MvYX6qeJlld4ZETzlbynZJ6wsantkHGoiaYOE9D8lWjprN1KRwxv0SHTWRgY11F5zbdeWmTbC7Epp0TzPhC5K3PKfFed5Gl4vh3YJg7w7U6bGtJb10jzIc7R2IwVyTWhatC0GpsObxsMm7UvCzIbJSmeZTJbxo/12Qs+XRrYZ2dC07FyRln50DfOSLMY2Qh1GCko99HbMBqrDYQgvORP6EeHC3PVOFdz3khrHO88zR2gJzDN0aSyyUzc7fVuEUNFppCFRHtOjF8nBW4mCJsz+B6KacP/aA7FZyCX00zY/yylYqPRWJGznBi9J/6nNmQitdAOEgAE1xhBPEgg4857OTjMui3eRe7vbf5sIvVnQvINKK2CSEAOpuZEJubXIWoeNut70rcEtcfrAgK3RbYSQoSzcTFp1uPZjiZI54fS1MwKexfWlL4hXO3nTZ8K3ev6FuqrL/sTpaVcjDYkEkDzTB1Zie8Sf+BgjhnltIexeK+EppYZbHKyYYq+QlD2f8Kn7+2NCT92bh6hpiGoiu9aYi+qQczDTwc85abfSBXqjnIa25DQxtHaKqLEiA/fFtL/YhPdoK2EZGa+l39TmCJeEoTVqbPQgzP6nKA6/HjRgdIzD90uJm8jS3VYdQnZJXfeoLTM39xZHsbiERGwIgjwnjcw5ec0K43RaWKm2xkkvQhitSH01cMdNR+Y9c/dGcq81p0HaTwzKdHlj56a57RKWfcJ9+Xs0heQ6RVa4SRk2+hNelBbtwZ8k0DEOIaGZvbbMT3TkNJeE0TW5AjUHlZGY8MQ69wldnW65wUKWE67j7UsIL4I1BEU4jLiE2oPStJiK0EKHJSoPBcG6v35IjiXhKxWVZKF7yrnthvn+hOBqlqODmmnghNkQgiJYLAyulNzlQqz7qzPE7dHYX0IoK5crFtm5m4v2J5wzkDk+hJBIlrj0/BeGOIsACJM+IXMPXIqTRYh92sUaRealm4v2J3wDMX/gJwl0jMP5G/Upzsw03uwTauuMy8nQNSpPyxKexR2HsurHeJnxB1BZvCtS44G//NSXUFRim4N2gXdUwBPX9zNSOnUopj3Fsktm3T0PDPsHrVOkKjJ4CEJtpcS8zOYqwtCKgewnyQHNtCNrW/jiRnKnofH6rL52TkQTUKhO6PiE6YYO4SJqHF6T0Fy0XwVEODHzIUbMG+wiWboz20EYWkGUk6yvQ6VSn9ZPy5bFZWo+AEVT/pN2TUJOVW/XyfCEU5zd5Om3LNGNMDNXYuaGCGOSsLFwkY7UCdcRLa5clxBRdTIgwqn5u4s3Efa+UVw0EYamF2nxwtfhywZhziOcOywKzNCnJxQ3OqynCbmppHnuEzYe7iWawcQ4LG6IVdOLpv6LdWa+65ilaRAi27PSmzvTW1o/zJwzypFHeGC3E0LCzUpzzRXvGi896KND5OswCMIbrVv0ItTOTEhGPcLJOqFVcK0UcbQ4fdlM9KOx1n0So43w5s50IB3OiKR7fqatt61llRvKhroOa02EYv1wWTizo7Z5J62nBj894fzswp2ff75zf36qNflpsdJsiBu8fgJonXDLJ2Tn3WdlRk4omKZ+hiLZTCx9WJho0WKLDjPamxKjvQnNlTad9QO+XcKm4TYzMzuxcO/eYkLmJ5Ql7oO1ztTnkFsIQU59wni9VUFMmApCBAlpq+fM9DPTwAmn2sVlmPly6s5iIpEQpez6GoFxtvj+57tTs74i2wnf+la6Wye0DyShCQlp6yJM5uz09WVPNQZMOH83sWS3yNLPIurNf3kPxRBjoL21s1Dm8icTMmey1Ehq2gn9vFTZaxBOSkIee6ddtEKclkpz14kWQRDOfkBt023IlonLgglwpWKpOC3GUCb0k/CWCC19MduVMFsnrNYfM2p/r0SElZrtse+qnCZYwo/ts21LH4SVzr4n1Fw7fHv4zg1k2tna2k/IZHzp7mx/wuV6oms/koR0tIQzE/fbJ9SkCv8vwcU8brbeC6KJyZg3nPKEOx3VixD7j30Eo94fB8Iey2uzdxLSxUt38Msvv8j7cpcnlu5KxF6E9VYMINyR0WLUhN1l9guTrmfE7oHQr38R8tvvLgdBsY/z/XSo88+CcGb2vYnWhQZ//4svvwmM7Dolrq/pRZhrPPtZTJiOKeHUxHtITBiErAagQISxSBB735cw7Kc0VJ6SOaaEs3eWuFvv/KVZfs2GViA5i0lv2pPQbhDujS3hDEeUi3mjX1sI/xLSMhslyshCP0KnTij2Xo4p4d2EbAwJhf7bSvi7XCFDCRiJM70IoxavE5Yj3T1NaK2pZ3gUhLMfE3LSQWs1UjBTsavu1ER0trcOCw1CisaW8A9O14Qx/dJBKJRY4kvzvQm3mgiJ3pPQ2BgpIYR7ImYZLtsIfxNR/00R9SNsfjSypfcYh4d8rXuzyScinLi3hMzXoiW7Q4cZaaVmHyvNNxGmexDCdxf6hPVhF5n5QJlADP3WSngpG86p8DS9CZsejZwK9yLsJ58kp7kPrqb0IBtqHYi/QRq3UUQ8cW+iN+Gk3ZhEF+2K3Qj7T9p8CsL5WYgXwttpzQHxv2Bac0WG3MWLXoRPmwjlZFs3Qi3U2bb3aXU4sbCESnKHRBPiL6FMds7k5E7frK2Z0Nnq4WnOTs8v+s15fwLC/0t4Gz0zv3tR/zfQYObybQktuZNuvQhXCWsQbvYYh2um8W60WdvE7BKnftfSL7/++uvvv2TkJt53RbY005dw/xqE2TVujjQeyuopsVh6k9U0b9YvI3/IXCLOPsz2JdxpJsz30iEadX0IITHGael0bu6BG5kzoZWVi9DZmon8tqhehMdNO7usg3HNvCdkkY/YomEYZMXbPWBOrxmLKPbev6AHYbWhQvmgiLElnFrkjDHEETu9BAs98zJNGrtzxWziSROhXRuU8GBwQmROXd1eMj81DwGRvP8QE2fQoHdz5yXKUYzEIBHg3jLw7B8JPt3w+PV1fNa0hzS2OhAhHUqHiF7P03yAOwXSBQ6MRhG0Gfvwx8e7d2JN49Bs0aFP6DQT7g9CeDmMlR6oEM6us5p9b4nG/gBVzi98SMg7XnovWvxmOEMfvEveJ9Ca1hCfMN1EKB+aKOe822SNs432v9XlrTGElUYthBb/uHOVfLxTpTSxIO159qO4V3Z/Vqr2o8kSH+U175c4Wp9rEvF8lsnJyeZnsLMq/KFMF0/n2gRR3vE3Xx4QRK3CoITy9N9rdMrGTHCaXtx7L1zH0n05STq/sLTITVNeghhaLBl1MRlHxLabARGnqg0mIH1ysxTFrmGjlyCm7g/8FDasLztNEbmXCG8Ruz87IzYBLcTko2Lfz87MTICBy2lG6ViFb0W8LhQMmLLWnWLuL2KzZavAXxYR7yrCtq29YZ7ghWt7VwKiMkf8w70vlqCKmP8DlGUgsNmJmcWlxbt3E5xxfvVHDCFVz80MSCjOjI/o4WhfAYcEVWACzG5qPsbJbsVh5hdQUUFdzCBMbn/b/+1DSq5xDO9g/fri5PtwX9HdRU4R30Fn1DpIHpvTCSj8kWwR42q+//uDk4F36fUlTCYrKRhrTIVCj334gFgsGX7lQPwHQG4BOyfVK76i0RNG+n/uARilOFK2ZoOzEM/VSiaPGGKUJwqb8YRKefpTEQ6+XTbZ72OT0XK6mo8mk26nqDjkP7kqOjJEC71eeBr7arXf2wOUYQ476f/JujxFNZmLE4SO5IMoCuKgUmczKV8MfyIVDvXci8i1bvKJIw6zSsJP+mOCjDL44NtlapGhTwGJ9BYsQkoE8gNmGlUZff++meLWZLj1MOc+nzC8DIt3LQmDD01tunrLPX6+3K73sXsAzk0lIpxO1DuhOhkuRHA74qjvcFjxzmz2hmwyietRxh/Fo77DYQX7huhhKT608HEC8rO30rrk6gqL1Fn/XBJpYOnh8Xw807DSGHORP4ML7SJNY+5P4F+6SlMA/kSx+Ar5f6SVKc52NfHBAAAAAElFTkSuQmCC"
                  class="fas fa-hospital text-purple-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p class="text-gray-600">Specializations</p>
            </div>
            <div class="text-center">
              <div class="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTn_kwEFDLN8F4ihD5pReEQJBxnMEXW123Q&s"
                  class="text-orange-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p class="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p class="text-xl text-gray-600">
              Comprehensive healthcare services for all your needs
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div class="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <img
                  src="data:image/png;base64,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"
                  class="text-blue-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Online Consultation
              </h3>
              <p class="text-gray-600 mb-6">
                Connect with doctors remotely through video calls from the
                comfort of your home.
              </p>
              <a href="#" class="text-blue-600 font-medium hover:text-blue-700">
                Learn More <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div class="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtMH6mjXYyTnSVvnExAOnFpuKKNdoCemu3g&s"
                  class="text-green-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Easy Booking</h3>
              <p class="text-gray-600 mb-6">
                Book appointments instantly with our simple and intuitive
                booking system.
              </p>
              <a href="#" class="text-blue-600 font-medium hover:text-blue-700">
                Learn More <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div class="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <img
                  src="data:image/png;base64,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"
                  class="fas fa-file-medical text-purple-600 text-2xl"
                ></img>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                Medical Records
              </h3>
              <p class="text-gray-600 mb-6">
                Access and manage your medical records securely in one place.
              </p>
              <a href="#" class="text-blue-600 font-medium hover:text-blue-700">
                Learn More <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Clinics
            </h2>
            <p class="text-xl text-gray-600">Go to our top-rated clinics</p>
          </div>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor1/150/150.jpg"
                alt="Dr. Sarah Johnson"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Johnson Clinic</h3>
              <p class="text-blue-600 text-sm mb-2">Cardiologist</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(9.4/10)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor2/150/150.jpg"
                alt="Dr. Michael Chen"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Michael Clinic</h3>
              <p class="text-blue-600 text-sm mb-2">Neurologist</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(8.9/10)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor3/150/150.jpg"
                alt="Dr. Emily Davis"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Emily Clinic</h3>
              <p class="text-blue-600 text-sm mb-2">Pediatrician</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(8.4/10)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor4/150/150.jpg"
                alt="Dr. Robert Wilson"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Robert Clinic</h3>
              <p class="text-blue-600 text-sm mb-2">Orthopedic</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(7.9/10)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Doctors
            </h2>
            <p class="text-xl text-gray-600">
              Meet our top-rated medical professionals
            </p>
          </div>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor1/150/150.jpg"
                alt="Dr. Sarah Johnson"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Dr. Sarah Johnson</h3>
              <p class="text-blue-600 text-sm mb-2">Cardiologist</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(9003 followers)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor2/150/150.jpg"
                alt="Dr. Michael Chen"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Dr. Michael Chen</h3>
              <p class="text-blue-600 text-sm mb-2">Neurologist</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(8098 followers)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor3/150/150.jpg"
                alt="Dr. Emily Davis"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Dr. Emily Davis</h3>
              <p class="text-blue-600 text-sm mb-2">Pediatrician</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(7893 followers)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/doctor4/150/150.jpg"
                alt="Dr. Robert Wilson"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              ></img>
              <h3 class="font-bold text-gray-900 mb-1">Dr. Robert Wilson</h3>
              <p class="text-blue-600 text-sm mb-2">Orthopedic</p>
              <div class="flex items-center justify-center mb-3">
                <span class="text-gray-600 text-sm ml-2">(7453 followers)</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-linear-to-r from-blue-600 to-green-400 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p class="text-xl mb-8 text-blue-100">
            Join thousands of satisfied patients who trust MediCare for their
            healthcare needs.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              <i class="fas fa-user-plus mr-2"></i>Sign Up Now
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              <i class="fas fa-phone mr-2"></i>Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home
