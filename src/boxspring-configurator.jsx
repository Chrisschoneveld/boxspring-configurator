import React, { useState, useEffect, useMemo, useRef } from "react";
import { Check, ChevronRight, ChevronLeft, Send, X } from "lucide-react";

const C = {
  blue: "#1E3C8E", blueDark: "#15306F", blueTint: "#EAEFFA",
  red: "#D81E27", redDark: "#B5151D",
  bg: "#F5F7FB", surface: "#FFFFFF", line: "#E3E8F0", text: "#1A2333", muted: "#5B6675",
};
const B = C.blue, R = C.red;
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAhRUlEQVR42uWdeZxcZZnvv+97Tm1d1d3pNekt6RBCVpKwEwigBgEFARWUxUGducg412VGxzvj9TrOXB2XGVBUrgsoo6OjIAhyQTIQZIkQQCSEhBCSkK3TnaXT6b27uqrO+z7zxzlV3Z2uTrqqu0Gd8/n0h1B16izP/vye531eJSLCm3gIIFYQsTiOBtSo7/v6kxzu6KWjc4DuniR9fYMkBzOk0gZrDSiFqx0iEU0s5lJWWkpFRQk1VXGqq8qIxcKj7ycWa0EphdaKN/tQbxYDrBUEwdE695nnZdi19zCv72xnX2snXb0DIBCLRilNhClLxChJRImXhAiHXBzHAQTP80hnDAP9KfoHPHr7++nrS5NKe7iupmpGgjmzKzhx3kzmNFUBw/c0xqK1Qin134MBR79wT+8gG15uYfOr++juHCRRFmJOUxUnzK1jdkMlVZWJSd2r40gve/d1sHNXB/vajjCU8pg1cwYrTm5i+clNRMIh/1yxKAE9QiD+pBhgTNbE+MfvNuzi2ed3cKR7kDkNVZyyoolFJzUQi4bza0v2MRUo8kurf4p/3ngmpqd3kC1bW9mwuZXDh3qpry/jvHMWsHhBw6j7vVHmadoZYK1BaweAZDLNo49vYcPG3VRWxFm18iROWdGMHqH+1hpEFEorFIrJWgYRQcS3/UrpUYRNJtP87sVdPPu7naS9DOedvYC3nLcQpRSCIFamXSOmjQHZyyqlSA5leOChF9m0eR8LF9ZzyYXLqK0pHaUdSqtRjJh2/yMySiN3725nzW82sf9AD+etXMDFFy7NnavU5AXhDWWAMSZwkPDgIy/z9PrXWL50Npe/8xQS8WjunKMlcoKc9Zl79GOrwK8USClr/WvpgBmH2nu4/8EXaWnt4l2XLGPlWfPHvNMfLANExCcEsGVrK/9xz3M01Vdy7dVnMaM8PsIJ68IlylpEBHUcIogxPiMKNB0igrXDWrG3tYO77nkeY+HD159D3awKjLVopadUG6aMAcZaHK2x1nLnT9axZ+9hPnDteSycPyuvE54wYYz1HW9AUONlGNq7h3RrG6anHxB0eYJIQwPROc04Id+Ji7UIhUc1Ir4fykr7M8+/zv0PvsCqlSdx5aWnBbJgp8w3TAkDsuq5e28H3/vh4yxb1sT1V62cnMSLYI2HckMooOuF33Hk3nsZXLeedEsLtn8A8TwcK0jIgUSc0OxG4ueeQ/VVVzNj5UoUIMZDaadg0+QzwheaoVSG7/3bOvp6knzio2+lvCxetEBNKQNEBCt+MvXo45t55LHN/MWH3sLik+qx1pdcrXThNt4alOP6YeOml2n72r8ysOYRVHIIVRJDRyLghtB+TIoVi+N5mHQGM5RERaOUXLSa+r//LOXLTh6+rhovgB0/T7c2a80UT/52Kw/8egMf+rPzWb6kaUr8QtEMyMbcSinu+PFTHDzUxd9+4lJi0VDx5iZ4WwUMdXZw4NZvceSHP0L19OImElgRJJPCZjzwDCLWTwwEcDSiHZSjwFi8gR5wI1R88AaaPvMp4gsWYkVQx8gjJpLHtB3o5tbvrOGCVYu57OLlk9aEohggIrlY+Wu3PERlZSkf+fBbpiSJMckk+2+/nfZ/uZn0/lacWCmqpARiUdzyUlRVFZGqatyaKqSqklhlFU48jpOIQ0kUCYVRnkGl0pjuLgZ378ELa6re824ql5/u5xdKF2lqfWJnPMNXv/FrGusr+fD1qyblEwpmQJb4Gc/wpa8+wMlLZ3PVladjrZ/oFBUhiGC8NJ3PPM3BO36I3dNCbMkiYosW4zQ1EG1sIDxzFpGqGpzSROFmDTDpFDoUnjTmY0Vy+cq3v/sIynH52EdW54KQaWVA9syMMXzxq/ez8syTeOdFy/CMhxvY7GKPzGA/A7t2EamtI1ZbczwqBOZnxEPlI2w2GdS64LD0uNm1NWjH5Y4fP8XAQIq//quLimLChBng31RAwz/+869YedaJvOPty/A8g+tOcYLihyCBzR5Orvx/MwayfnNwdMEEecMdP34CL+3x0RvfXrBjnjC7jPWzxX/9xq9Zvrx5eoifzXCVAsdBuy7KcVBa+1Ks1B8G8QONcxyN8TLc+MG3kvYsP717PY7jYIydWgYYY3AdzQ9+/CTV1eW8912n4nne1Et+EVDCm304josxlk9+9GJ27jnEY0+84jPGmqlhgK9mDo89uZlDh3v5ixvOxxiL67r8tzjy4U5HCY0OEIDP/s2lPLx2M9te34+jHewErLs+9r0tjlbsbulgzaOb+fTHL5lgmGn/VKgPSiFKIcYcU3EBwuEwn/7YRXz3h08xMJgCGUaFi2CAYAU8z/LdOx7jozeuJhoJDzvD8R4YW4hr+YOWfCtCz84dGC+FchysZ8YlqNYaYy0N9VVc+Y5l3HbHY2itfESgGAYY44dUP/6P33LmGfM4ce7MXDkxP+EzgYPUGLMVkeQfPQO00pi+Pra871o6n12Pdh0/AfW8vGbJ0RrPGN5y/hJCjmbtk6/gOM4xmaDHw8gdx2HLtjb27DvMVZefgWfMOCm3RRAghDWtmP6bkJ4LENsZFAdlSoki1iLGIF7wZ7wR/zZg7bFt9oTDE401hsoVp1Iyq4Ht569mx6c+xWBrC8p1fWHLQ1hHO1gr3PTnq1mz9hW6ugcANf4jSZ7DGCvWWvn7f7pbdre0+59Zk+dMz/9OPMkM3iLekVqxHYjpUGIyG8UG3xZ7WGPEZjJiPa/w33qeiLUymcN6nlhrpe+1rfJCbYP8PpKQF0+YJy3f/KZ4JhM8o5eXfiIiTzy9Vb5+2yM+pUx+Orjj4R2/fuRl5jXPormpZpwMzyA4iG3F9t2IyvwnjgJRIbAZxO5Hs3xSGjAyg7ViSXd0MLS/Da+1jaH9B/E6OlCpQf8OJaXEmhqILVxEfOlSnFDIDwUmg9M4DogQX7CA2GnLSD37e/TAEPs/81l6Hn2Ued//HrGGRqwx6BHJl9YKayxvOXchv316O1u2trJkUWPeAMYdq3mK/sEUT63fxhf+1+X+j8ZgLxZwELMD6bsMx2xHnDAWDyU+DI1pmRzmYgw9Gzcw8OzzDGzcRPr1HaTbDmC6uyCZBM9Xf4VCsumZFihJEJ4/j8prrqLuxptwS0oQa3MFncILQgbluiRWnc/A408RTpQQra1h6PF1bH3nu5h/710k5i/wIXTtjIqMRITr3ncWP7l7PUsWNea9vptP+h98+CXOPmMe8Xg0j+O1iCistCN9V+J4PvGVzYCS4UvafQFhpGA7j1KIl2Hnn9+IbNoC8TiO46JDIRw3jCqLIrmkWA1rmSiwBvPaDg5+5nN03nMfJ9x5O6UnLSqeCUHEF1++FFwXrGCNwa2qxOzay473X8/iRx4iUl07nMUH2muMZd7cmZSXJ3ju9zs5+/R5Y7RAHy39AwMpXtnSyqVvXzamc2CUT+3/GI73KugoSrLEHz5B7J4ANFCFv7AITiRKSVMTzowKQpUVqHgJhFwE8VtXco7YG+2QRdCxKKFZtWRe2syOq65l6OD+gE9SNAMis2dDSQkE+YBkPJwZ5ZhXt7Hnk38T1CVkTGgqAu+97FQeeWzLsaMgExSz1z6xmWXLmohEQn7HwCjie6A0Jn0/KnMPOC6QGmPnFYC0Bp8WU5jxf+nWzcKkhsDYgqIbsRZJe4SqKjDbttPyf7+EUppiak9Z8VFlcVQ47D9bwBTJZAhVV9Fz34Mc+uU9oDVivKNkyTK7qYrS0jAvbWoJcgMZywClNZ7nsWHTXt7xtqW+JI2SfgE0YlOo5Bf9qpJIHicb/L/Zj8jQaBNRIO4dbmxErCkaf7NpD7eiit4HHmJwz27fBFlbZEDgN4vlY3Y4GuPQ12/FDCVBO6MFJWDWxReezKNPvhJQ6CgG+I5W8eLGPcyqmUFZedxvSDo66lEa6/0G7W0EpQEzTvoOSjpAuouHAIBIYx25kmOR11GuxnZ20fP0uoBgpognAZvyTd0YEMBaiJeQ2vQKnY8/7qMEI5islS/xSxY0kB7y2H+wCycwTTkGZG+y/vldXHDegnHghqCSmv7VxDB56QVz8KjXKMzuuo1NEApNLpcLfju0bedRRqVAbWrvQJJJPyyWsSZXW+h+6OEs28fUUgBOXT6bdc9sD/hmhxngaEVXdz+9/QMsWtDgm58x6qax4oH33HEANwkua0Amx4BoXT06Gi7abGTVXQGpvp4AqSqQAUHn3MC212BoyDcxeYpVKhJhcMOLmEwK5YxmUtaUrzxzPtt2HhhFX20Ch/Dixr2c0DwzpzJjiaoQOQSyL+tlj+m6FCC2pSgGZLXPra5GlZb6EEOxdQLlm7BYRSWqiLBYab9G0bd+ve/I8/1eBB1yyRxoJ3Xo0Cg/ltUQay2VFXESsQg7dx/yMSURcsZo89Y2Tl0xOxeO5tNjZbtR0j/h2EHsnkklY6GqCkKVlT74VSykI2AdiJ2yfBR0PLFYwIJSDHUeoX/detySkvzaKILSDjY5iO3qyity2XBlycI6NmzcHZghg/Y7v9L09yWZf8KsY8LNCpmQMOfa9M2+4uxukAu4kRL0zFrwvOI0QGvs0BChE5qpuOCtfnygJ17Fs8ZnQMcv78O07EFFIuOHsgpUxsMMpcdogO+M/X6nk5c2sXtvZ/Caju8DXt/VzowZJYRDLsYYJn9I4JhaJpEL+JIWqZuF9UwR7SR+pSrd18esz3yGUHm5f80JXEeyZkVr0n29HP7Od3FjcX+NwTF+o2T8ZC8LTdTPqiRjDd29A2itAgbsbKe5uXpSUcIYTVEgchCRlA8RFJwLBFhJU33OFBQEomlN6sBBqj7xl9TdcIOP6RTQwSaeQWlN68234G3djhOL+w75GFb3eG+YXWtQW1XKzj3tw6LZdrCL+c0zx7H/xZbyAGkHe2QCTvsYuUDT7In9VimU66AcjentIzPQR+0/fo55N98StNMU8F6ehwq5dKxdS8e3bsOtqMAajymQTADmNFWzZ/eRwEeJpb8/RWN91XHKjUXcT3rBHi4ujM9iMA0N4DqjG7C0BsfxW1Zc149O0mkyR7rI9PYRWbWSeQ/+kubPfx4C2k+oHVFAPA/luvS+spk9N/4lISc0ZZ0a2Y66OU1VtLf7Sarb1ZNEKUgkIiPBvMlrAEHab1uhiLpAVhDCdXXoeGnOMEomWwXL+ECcCBKL4DY2Unae35pe+ba3+Yi456FdZ2JmVXyUU7suPS9vZOf73o/u7oN4LAfATVogg3eaWVtO36DvrN329h7iJaFc0cNRU1VQ93MBI20BQF1cMhaqqcaTDKarD1WWQFckcCur0HWziDQ1UrJwISWnrCBx8smES8tGlS4d1z3ufQWwXgbthtCuy6EHH6DlY5/E6U2i47FjdkMUe5SXlSACg4Mp3I4jg5SVJopKWI9r8BRg9k7CXgpuZRWN/+82YuXlhBrrCdVU486YgROKjpVrY/xoJDBPEwkqFOC4IdLJQfZ9+St0fus7uKEwqiQ6LcTP1gMiEZcjXYO4R7p7KSuLMl2HCkLRwnvy/cjJjcRouPrq/JCzBBC1CloXHaeAu/iL/UwqzcF77ubAF7+C3bGNSM0siESxNgDepngJo59HKGKxCN09A7j9/UPUzSyfcgecjYTE7stX+ykobMhJohpeYe9Xt/SkHk/QeF4GwhFqrnkfyW3bSb74Emb/frR20YmEv/BjGjQhFg3R1zeIm0x6xGKRaZD9bJnwAEgKVCSHKRXMhmlYHopSKBGiiVIa339N7uOhgwfoXPck3Xffx8BTT0FfmlB5WW7h9lSJaDwWYmDQQ2eMJRIJTxsDlD2MtUf4Qzyy2pQtb2KF6Kw66t93LYt+eQ8nPfwgiXdfRrq/HxlKTakghFyHdMpDZ9d5TZ8G9IAcLg6WfqMY4Tgo1/ETBhEf/LNC+ZlnseinP2XOz36ENDRgunvQjjNc/p7E4boOGc+b7iZO7bep2P1/0AwYm1G7Pgxt/Vr0zMsuZ8lja4i+YzXpzg4kFCr+XdRItEzQiuM3kE6GAQIjeoT+CBhwFJqK1ljPIzJzFgvvuovE9dfiHTmEckOTMgyel8H1cw9FKp2avndQILJv+omV7eOfhtkj2nXBWlwnxILbbyfx7ivJdHWiHLfo26U9QyzqoGOxEMnBzHRRJcg+9kwB0ho05uZ6gjy/BSTbrpJdXZP1ZyLDvUNToOFK69zImxO/912cpYsxA/0FIawjj+SgR6wkgi5PlNDXnxqRJEwDD2zbJHIBv64rqGCt2AgQznF9E6EUxhi8VBqTTvsLupXKOdcs8SYbz/ttLYZQWTnNt96CpwPNK0KwBoYylJWW4FZUJNi569D0aYACZfYjpFGEi8sFBDKDA2TaD5I+3E6m7QBDrfvJ7NtDZv9BMkc6obcHO5RBKYUtjeLOqCQ2u5nYimWUnnUWicWLUQ4+pq8oGnVUjoN4hsqV5zLj+uvo+8GPcKsqETsxuDobcSaTg8woj+HWVJWy4eU905AJDzNAy2HEdoGeObKVdmJXMAblOHQ8cB/7Pvo3OCEXGRwIiiPKDwsdDTpYPOEDLqSMIWkMiEWVzyB69mnU3vQRat55aQ7KKHriSRCu1n/if7Lt3l8iXmbC65Czq2a8lF+k1zNrSxlMDo3Cq6ccgKIXsQezwEJxiUtlFTqTIRSNEqqoJFRdTai6Ej2jHJVIoEpiEIugYhFUvARdXkqosoJQdTWugvTj69h99TVsu/F/kOnr9c1JkSZXBYvyEvMXEH/7ary+/qDWLMeNEwC6e5IorSmJhdFlZTGUKHr6kkVWro7nADRKDNgDRcflANH6elQAD+ecsGd8rD6I17ES/Fkwdvg8QJeVEqmoou9HP2PbNdfhDfRhRYoOwZUISoTKK64I3MDxiynZlpYDh3qIJ2JZZVKUl0Zpbe0MVHPKMxv/2czeXLG7GLggVFPj9wh5xfUIibGI5xGum0nykbXs/dznc865OF/gLxwvPftMdG01kjm+D8gGOXv3HaZuZulwWFLfUMHru/0isZ3ySCjbI9RSZCQaNGlV+m3qk+kRArDpDKGZM+n88U/pfvEFHMctLkxVGgSidQ1ETpyHDA3lbd7NF5Xv3dfBCc01wwyYf+IsdrccnNZISOy+ItcL+A1SOugRkmJ7hEZplUYnhzhy189HG+dC38watNZE5s3FZjJBw/LxHXDnkUHmNddmGSCcMLuG3t40qVR6SsZw5Re9fUX2CPkJmAbC9XWIyUyaAWItKhZj4NkXMF6meJQz4Fu4qfG4/avZMT+tbZ2Ew4pEIurPGTJGCIdDVJTH2fa6rwV2nP4XAQqHAoNcwB706wIFrxdQKAn8wOxGH5Of/DRXtOuSOXCQdEf7JLTA/02orNx3sFoNM/OoZ8zSdOOWFk6YW5u7ZS7yXLakgd9v3DVuRhzcijzr+iYIS7cjtnNSdIvWNwZVMZlctBaMOGOwH9vdOykzBKDDrn/NcAgnHstraLNC89r2Q5y2Yu4IrC9IIE5Z3sy+li6MMXkSFL+iq5waRFUV6Yp7EGkvDhUN3iZyYj0eGq9fgihEiuaAEgVKI1OQ+5h0GvEMTtkM3NraMRog4tv/9sO9pFMezbNrApOkfYNsjKWsNEZlZYJNr7bhL/KQoyhgEVUJelHQaqgLEDcfQxnGhAoMRR2/72/GOTNZcJdH+OQkqS5QGV24QgbEEWvQ8QRuVUVek1GIZHjdPYjJEJo3l0hlFUc3WGVH1zzz/A4WLqgbZZL0yHuvWjmfdc+8No4ZChpTQxf44FhB/UM6iIRai9OA7LvqGirf4bD4V100fbkPU5XBOxLUaZ3CGGBTaSLz5hKpqslN/C08EvV/k9rXClhKV60ElD9sdsThBNDF5i1tnH+OvwIpu2hD+7bIX0G4fOlsOjsH6Ojszy2xHElEBajwVYiO+ZWugppAQJk9k8ollK7C66tBYaj/eD9Lft1N1U1DeNZieoIoUB+fwcpxMKkhyi6/zG9ZtEWgpL5dwWTSpF95FV1WQeUVVw5jRTnn60PYL73SQlkiQm11qf/Z0fiwDUa1n3n6PNas3RSYITtairFodxG47wke2pkw+TUgdn+2VF8EAwRUCbi1KOv3/EZrU5xwcxcn3ddH/KIUmT5BkoB7DP/guNj+PpyFJ1F73bW5xRWF09+/fnL3XgZe3kjZe64gsXAR1pijFoT777r28Ve4aPXSMeYud6bj+Fqw+vyFbHmtjYGBFFrnW9AjqNgXsLqscCxc9gZnF5NrBKMJ9Bw/rHVBMmC7hLLT+ln40y6a7+jFnZ8mc0TAaB9+HkV8B51OkxJL8603E5lR5dviYux/YMN7Hv1PLJrG//O/fXxIjY39d+46RCptWbywwY/91Tgr5a0I0WiYs05t5oE1L/nYusmnBfNRsa8iYoKwVE3AAAF2PyIZilo7nC1j68ZhLVKgHJB+hQwaaq7qZ9FD3cz6hwFs3CPTFUzKdTS4Dra/n5R4zL3ze1S9dXUeaZ34s1hHIWI5+IM7afzKl4nPm++blhHalJ3Ue+9Dv+fSi5eSD4vRo52FD7O+8+JT2LSpha7ufrRSY3yBSAYV+yg29kk/Mz0uE7I9Qh0gk+sRUrp57BwiR1AabBe4IcPsv+tl8cM9VPyZh5fWeN0pMh1HCC1dwom//hWz3vM+v3PacYoSfjF+E/OBn/+M+KpzaPrkx8dMTLHBhJlXt7WRSQunLpubd1pKXvZHwi4XXriUn/3iOdSYsVsKhQMYnPitmJJP+wxBjpGkZRdvdyO59QK2KEeMnp3NSoLHd4L7umjHBauwHUKsKcmJt7Uz72dtlLxjDvU3/wuLH3+UyrPOCdrQnUkIgfYrdI5m/te/kVvOlA/7v+ve57jmvWeMa63zjKvRWCtceP5i1j39Gq9tP8DCk+pGcy9YcCYYnPjNiLMEM/hZtBxiOCY0Y0NRLGJaUe7JRZigIBJy6oMKsTc60R55RSeCl2pGzCoqLr6MGRe/HUU8hwPpyXa4KYUKRWh6/3V5JTi7EcSaxzZTX1fpj3sbZ6quO24NROBD16/i+//2FF/5wnsDjo5dPa8lA9EPY0Nvwya/hErdicKMmJlgR8PS0jKpypiomYiqQ5SHqFJQtShd5/sGNRflzEXpBTjuXFBRhicc+/sIqCkaYeyE3LxjkyWw+13dA/zmiS380+euPOakyXFHFxtrcLTDz+9ZT9qzfPDaVccY1e6HpALYzDNI8vPo9BNB/uWQHfCEeNjo59DxL4F4KFU4riQ2g0g7SkUREigVzS1FyP9chWZpk4QlgtHF/3zzQ6y+YAFnnzH/mAwYVxwcrTHGcO3V57B9xyE2v7oPx9HjlPB8Iisx6NC56NLfIIl/R9SJQb4wcpDTHopHcEApF+U0gq5G6ShKWZR4AbGz/7VZxO0NJL7kiP//12ygrDTG2WfMxxjvmAsf9bFsbjZD/vhfruaH/76O3r7B3BL7/HCDg8KileBE/wxV/jw29g9YyrEy5I8Xk0NBV0gRo979zWRQSO4vlxTknLETvNYbOwI5O2lyx85DPPXMdm768wt8yT+evzne5EATTPtb//wO+fwXf+FPAPSMHHseoRGxKbFWxIqI522VTO8HxBxGMp2NYuxQdi6h/PEf/oRJsVZ6+gblE3/3E2lpPex/M4GpjccVQx2YopVnnsjiRbP55nfW+sOpjTmGI9WgwijlRyuOsxCn9CdQtgbrLEVsB38qhwT7mlmEr9z8ENdctZKmhmqMtRMqHE14/4CsA77t+49SWhrjg9edh/EsjjsRU2IRDBBCxAPSKFWC+lMgfjDW/8u3PMCShU1ccempBe0rM2FD7Eu95WM3XcT+g1384v7ncVx/VO/xQ0qNIgQYtHLQfzLEt2hHc8u3H2Z2fVXBxC8YFdOOn6R99lOXs/31A/zivudwHQdjJhbX+CGp+pMwO/72hw63fPs/KSuP84FrVwVR0DRtYTI6xfZRvq9+/UFm1lbw4Q+s8ruPeeM25JxY0CrDFTmmZgZGFrYXga/c8gCNddXccP25RW9nVeQ2VsNM+PbtvyGTzvCpj10MqDd0L96xhM4CLvlKpjJpJmTj/N7+JF/7+sOctmIO77n89Elt6Fb8Rm4jEL+77/8dL7+8j09/4mKqKhPTsPNoQNxgTKZk8wjRiBoGt0eB3DKEmM0YsxvlnIbjzh0B4hVucrL4zms7DvC9O5/gvVecznlnn/TmbOQ2WioEx1E89/ud3HXv81x71dmcdfoJI6psasplPTe4Qwwi3Sh7AGv3o+wuxGxBeRsQswtxVqCif40OXYDW4aIKQSM3aXvg4Q2sW/8aH7/xQprn1E7JfpJTupnn4Y5ebrv9N9TNKucvbriAkOuM2UO+SAACa1qwqfvBbEXJQX8WkbSDPeyPxQmmqYkC3JNR0b9FRW4ISC55iyHHLnhZf9SN1nR29vPdO5+iJBbirz7yNiIht+iN26aFAUdL+933P8cLL7Vw9RWnc9ZpJ+TyiKJ2VQ1Mj5V+xHsB8R6FzPMo24aSAVAhv13GmY04Z6NDb0W5Z4+4T2FbqkjQsp41oWvWbmLtk6/yrktW8NbzFo5APKdGs6d8Q+dsE9K+tk5+9LOniYQdrrtqJY0NlTlGKK0pzDIJOWM/ys4PBh4hlsOWVI7olkKahqxYRMhJ9eZXW7j3/heoqirnQx84l7JEbFp21Z6mLc2HbeNvn93GmrWbmdNYyZXvOo2ZNeU52+oDfoVwwo6QaH2M7ybmbEV8wmslqKCCv/31Q/zq4RcZTGa4+vLTcnP/pyu6mxYGjMRItPaHnT689mXWP/c69XUzuGT1UubNnTWKYf4K00J8hYxJ8yYaQksQTY0sI760eQ9rH3+FwUGPS1Yv5ewzT8z5N990Tk9oPW0MGO0bfAKJwJNPb+XpZ3fguJqzTp3HmWfMpTQeHUEgiz9dUuWYMhWCkDWNI693uKOP9b/bwcZNbcRjDm+7YDGnrmjOPfdU3P9NZ0A+Jw2w7fUDPP3MDva2dVBdmWDZ0gaWLGqkpqo8v2OUo4fGquE12UcNlD0W89r2d7JpSyuvvtpGXzLNSfNqueDchTTUV4wIbfUblky+YQwYyQgf5g4aWz3Lpldb2LhpN/v39+K4LnWzypg7u4bZTdXMqi0jFitunE5fX5KDh3rYs+8Iu/ce5vDhXpRWzJ1dzakr5rBgfv2wGQzg4zcaSnnDGTA2uxztMA8c7OH13QfZu7eDw539pFIejgPRaJjSkgiJeIRINEQkEs7ZcM8zpNNphobS9A2kGRjIkEylEbHEomHqastobq5l3twaqipKxwQMxYXHf+QMODrbtOJ3ER9tNqxAV1c/nV2DdHb30d8/xMBAhnQwshL8VSaRUIh4IkRZIkZFRYLKyjgzykry3ssfM/eHARz+F+A7HmJkxX4vAAAAAElFTkSuQmCC";
const API_BASE = "https://boxspring-bc-api.vercel.app";
const euro = (n) => "€ " + Number(n || 0).toLocaleString("nl-NL", { maximumFractionDigits: 0 });

const parseMaat = (s) => { const m = String(s || "").match(/(\d{2,3})\s*[xX*]\s*(\d{2,3})/); return m ? { breedte: +m[1], lengte: +m[2] } : { breedte: null, lengte: null }; };
const norm = (it) => { const { breedte, lengte } = parseMaat(it.number + " " + it.displayName); return { ...it, breedte, lengte, prijs: Math.round(it.unitPrice || 0) }; };
const stripMaat = (s) => String(s || "").replace(/\s*\d{2,3}\s*[xX*]\s*\d{2,3}\s*/g, " ").replace(/\s{2,}/g, " ").trim();
const CATS = ["OND", "OPT", "MAT", "TOP", "STO", "HBO", "VBO", "OVR"];

// ---------- SVG placeholders ----------
const S = { width: "100%", height: 96, viewBox: "0 0 140 96" };
const sk = { fill: "none", stroke: B, strokeWidth: 2.4, strokeLinejoin: "round", strokeLinecap: "round" };
function Illu({ kind, breedte }) {
  if (kind === "bedtop") {
    const w = 40 + Math.min((breedte || 90) - 70, 130) * 0.6;
    const x = (140 - w) / 2;
    return (<svg {...S}><rect x={x} y="12" width={w} height="72" rx="7" fill={C.blueTint} stroke={B} strokeWidth="2.4" />
      <rect x={x + 6} y="18" width={(w - 18) / 2} height="16" rx="3" fill="#fff" stroke={B} strokeWidth="2" />
      {breedte >= 120 && <rect x={x + 12 + (w - 18) / 2} y="18" width={(w - 18) / 2} height="16" rx="3" fill="#fff" stroke={B} strokeWidth="2" />}</svg>);
  }
  if (kind === "onderbak") {
    const h = kind === "onderbak" ? 34 : 34;
    return (<svg {...S}><rect x="18" y={54 - 0} width="104" height="26" rx="3" fill={C.blueTint} stroke={B} strokeWidth="2.4" />
      <rect x="24" y="80" width="7" height="10" fill={B} /><rect x="109" y="80" width="7" height="10" fill={B} /></svg>);
  }
  if (kind === "matras") return (<svg {...S}><rect x="14" y="34" width="112" height="30" rx="7" fill="#fff" stroke={B} strokeWidth="2.4" />{[0,1,2,3,4,5,6].map(i=><circle key={i} cx={26+i*15} cy="49" r="5" {...sk} strokeWidth="1.8" />)}</svg>);
  if (kind === "topper") return (<svg {...S}><rect x="14" y="46" width="112" height="20" rx="5" fill="#fff" stroke={B} strokeWidth="2.4" /><rect x="14" y="34" width="112" height="13" rx="5" fill={C.blueTint} stroke={B} strokeWidth="2.4" /></svg>);
  if (kind === "splittopper") return (<svg {...S}><rect x="14" y="46" width="112" height="20" rx="5" fill="#fff" stroke={B} strokeWidth="2.4" /><rect x="14" y="34" width="55" height="13" rx="5" fill={C.blueTint} stroke={B} strokeWidth="2.4" /><rect x="71" y="34" width="55" height="13" rx="5" fill={C.blueTint} stroke={B} strokeWidth="2.4" /></svg>);
  if (kind === "hoofdbord") return (<svg {...S}><path d="M40 84 V34 q30 -26 60 0 V84 Z" fill={C.blueTint} stroke={B} strokeWidth="2.4" /></svg>);
  if (kind === "voetbord") return (<svg {...S}><rect x="34" y="50" width="72" height="34" rx="4" fill={C.blueTint} stroke={B} strokeWidth="2.4" /></svg>);
  if (kind === "optie") return (<svg {...S}><circle cx="70" cy="48" r="26" fill={C.blueTint} stroke={B} strokeWidth="2.4" /><path d="M60 48 l7 7 l14 -16" {...sk} /></svg>);
  return (<svg {...S}><rect x="20" y="30" width="100" height="40" rx="6" fill={C.blueTint} stroke={B} strokeWidth="2.4" /></svg>);
}

export default function Configurator() {
  const [mode, setMode] = useState("klant");
  const [klantModus, setKlantModus] = useState(null);
  const [klant, setKlant] = useState({ naam: "", email: "", tel: "" });
  const [klantId, setKlantId] = useState(null);
  const [zoekterm, setZoekterm] = useState(""); const [zoekRes, setZoekRes] = useState([]); const [zoekBezig, setZoekBezig] = useState(false);
  const zt = useRef(null);
  const zoek = (t) => { setZoekterm(t); clearTimeout(zt.current); if (t.length < 2) { setZoekRes([]); return; } setZoekBezig(true);
    zt.current = setTimeout(async () => { try { const r = await fetch(`${API_BASE}/api/customers?q=${encodeURIComponent(t)}`); const d = await r.json(); setZoekRes(Array.isArray(d) ? d : []); } catch { setZoekRes([]); } finally { setZoekBezig(false); } }, 400); };
  const kiesKlant = (k) => { setKlant({ naam: k.displayName, email: k.email || "", tel: k.phoneNumber || "" }); setKlantId(k.id); setMode("keuze"); };
  const [nBezig, setNBezig] = useState(false); const [nFout, setNFout] = useState(null);
  const maakKlant = async () => { if (!klant.naam) { setNFout("Vul uw naam in."); return; } setNBezig(true); setNFout(null);
    try { const r = await fetch(`${API_BASE}/api/customers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(klant) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Fout"); setKlantId(d.id); setMode("keuze"); } catch (e) { setNFout(e.message); } finally { setNBezig(false); } };

  const [data, setData] = useState({}); const [laadStatus, setLaadStatus] = useState("start");
  useEffect(() => {
    if ((mode !== "config" && mode !== "showroom") || laadStatus !== "start") return;
    setLaadStatus("laden");
    (async () => { try { const res = {}; await Promise.all(CATS.map(async (cat) => { const r = await fetch(`${API_BASE}/api/items?category=${cat}`); const d = await r.json(); res[cat] = (Array.isArray(d) ? d : []).map(norm); })); setData(res); setLaadStatus("klaar"); } catch { setLaadStatus("fout"); } })();
  }, [mode, laadStatus]);

  const [maat, setMaat] = useState(null); const [breedteSel, setBreedteSel] = useState(null);
  const [stap, setStap] = useState(0);
  const [sel, setSel] = useState({ onderbak: null, bodem: null, matras: null, matrasR: null, deelbaar: false, topper: null, stoffering: null, hoofdbord: null, voetbord: null, opties: [] });
  const set = (k, v) => setSel((s) => ({ ...s, [k]: v }));
  const [matType, setMatType] = useState(null);
  const [obHoogte, setObHoogte] = useState(null); const [obVering, setObVering] = useState(null);
  const [hbModel, setHbModel] = useState(null); const [hbUitsteek, setHbUitsteek] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const opMaat = (arr) => (arr || []).filter((x) => x.breedte === maat?.breedte && x.lengte === maat?.lengte);
  const opBreedte = (arr, b) => (arr || []).filter((x) => x.breedte === (b ?? maat?.breedte));
  const optBodem = (data.OPT || []).filter((x) => /elektrisch|hoog-laag|hooglaag/i.test(x.displayName));
  const optExtra = (data.OPT || []).filter((x) => /plint|steunset|wiel/i.test(x.displayName));

  // maten gegroepeerd per breedte
  const breedtes = useMemo(() => {
    const m = {}; (data.MAT || []).forEach((x) => { if (x.breedte && x.lengte) { (m[x.breedte] = m[x.breedte] || new Set()).add(x.lengte); } });
    return Object.keys(m).map(Number).sort((a, b) => a - b).map((b) => ({ breedte: b, lengtes: [...m[b]].sort((a, c) => a - c) }));
  }, [data]);

  const matrasTypes = ["Amber", "Claire", "Elza"];
  const matBreedte = sel.deelbaar ? Math.round(maat?.breedte / 2) : maat?.breedte;
  const matrasVarianten = matType ? (data.MAT || []).filter((x) => x.breedte === matBreedte && x.lengte === maat?.lengte && new RegExp(matType, "i").test(x.displayName)) : [];

  const stofLijst = useMemo(() => { const m = new Map(); opMaat(data.STO).forEach((x) => { const n = stripMaat(x.displayName); if (!m.has(n)) m.set(n, x); }); return [...m.values()]; }, [data, maat]);

  // hoofdbord modellen
  const hbModellen = useMemo(() => { const m = new Map(); (data.HBO || []).forEach((x) => { const model = stripMaat(x.displayName).replace(/^Hoofdbord\s*/i, "").trim(); if (!m.has(model)) m.set(model, x); }); return [...m.keys()]; }, [data]);
  const hbKies = (model) => {
    setHbModel(model);
    const b = hbUitsteek ? maat.breedte + 20 : maat.breedte;
    const it = (data.HBO || []).find((x) => new RegExp(model, "i").test(x.displayName) && x.breedte === b) || (data.HBO || []).find((x) => new RegExp(model, "i").test(x.displayName) && x.breedte === maat.breedte);
    set("hoofdbord", it || null);
  };
  useEffect(() => { if (hbModel && maat) hbKies(hbModel); }, [hbUitsteek]);

  const regels = useMemo(() => {
    const r = []; const add = (it, p) => { if (it) r.push({ itemNumber: it.number, label: (p ? p + ": " : "") + stripMaat(it.displayName), prijs: it.prijs }); };
    add(sel.onderbak, "Onderbak"); add(sel.bodem, "Bodem");
    if (sel.deelbaar) { add(sel.matras, "Matras L"); add(sel.matrasR, "Matras R"); } else add(sel.matras, "Matras");
    add(sel.topper, "Topper"); add(sel.stoffering, "Stof"); add(sel.hoofdbord, "Hoofdbord"); add(sel.voetbord, "Voetbord");
    sel.opties.forEach((o) => add(o, "Optie")); return r;
  }, [sel]);
  const totaal = regels.reduce((s, x) => s + (x.prijs || 0), 0);

  const [verzonden, setVerzonden] = useState(false); const [bezig, setBezig] = useState(false); const [bcRes, setBcRes] = useState(null); const [bcFout, setBcFout] = useState(null);
  const naarBc = async () => { setBezig(true); setBcFout(null);
    try { const r = await fetch(`${API_BASE}/api/quote`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ klant, klantId, regels: regels.map((x) => ({ itemNumber: x.itemNumber, aantal: 1 })) }) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Fout"); setBcRes(d); setVerzonden(true); } catch (e) { setBcFout(e.message); } finally { setBezig(false); } };

  const styleTag = (<style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap'); *{font-family:'Figtree',ui-sans-serif,system-ui,sans-serif;} .ff-display{font-weight:800;letter-spacing:-0.01em;} .btn-blue{background:#1E3C8E;transition:background .18s ease;} .btn-blue:hover{background:#D81E27;} .btn-cta{background:#D81E27;transition:background .18s ease;} .btn-cta:hover{background:#B5151D;} input::placeholder{color:#9aa6b2;} .opt:hover{border-color:#1E3C8E !important;}`}</style>);
  const Header = ({ sub }) => (<div style={{ background: B, color: "#fff" }} className="px-5 md:px-10 py-5 flex items-center gap-3"><img src={LOGO} alt="Boxspring Slaapcomfort" className="w-10 h-10 rounded-full bg-white" /><div><div className="ff-display text-lg leading-none">Boxspring Slaapcomfort</div><div style={{ color: "rgba(255,255,255,0.75)" }} className="text-[11px] tracking-[0.2em] uppercase mt-1">{sub}</div></div></div>);

  const VCard = ({ active, onClick, kind, breedte, titel, sub, prijs, foto, onZoom }) => (
    <button onClick={onClick} style={{ borderColor: active ? B : C.line, background: C.surface }} className="opt relative rounded-2xl border-2 overflow-hidden text-left transition-all hover:-translate-y-0.5 hover:shadow-md">
      {active && <span style={{ background: B }} className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center"><Check size={14} color="#fff" strokeWidth={3} /></span>}
      <div style={{ background: active ? C.blueTint : "#F7F9FD" }} className="flex items-center justify-center h-28 overflow-hidden">
        {foto ? <img src={foto} alt={titel} className="w-full h-full object-cover" /> : <Illu kind={kind} breedte={breedte} />}
      </div>
      <div className="px-3 py-2.5">
        <div style={{ color: C.text }} className="font-bold text-[13.5px] leading-snug">{titel}</div>
        {sub && <div style={{ color: C.muted }} className="text-[12px] mt-0.5">{sub}</div>}
        <div style={{ color: prijs ? R : C.muted }} className="text-[13px] font-bold mt-1">{prijs ? "+ " + euro(prijs) : "incl."}</div>
      </div>
    </button>
  );

  // ---------- KLANT ----------
  if (mode === "klant") {
    return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Welkom" />
      <div className="px-5 md:px-10 py-10 max-w-lg">
        <h2 style={{ color: B }} className="ff-display text-3xl mb-1">Bent u al klant bij ons?</h2>
        <p style={{ color: C.muted }} className="text-sm mb-8">Zo staat uw offerte direct op naam.</p>
        {!klantModus && (<div className="flex gap-3"><button onClick={() => setKlantModus("bestaand")} style={{ background: C.surface, borderColor: B, color: B }} className="flex-1 rounded-2xl border-2 py-5 font-bold text-xl">Ja</button><button onClick={() => setKlantModus("nieuw")} style={{ background: R, color: "#fff" }} className="btn-cta flex-1 rounded-2xl py-5 font-bold text-xl">Nee</button></div>)}
        {klantModus === "bestaand" && (<div><input autoFocus value={zoekterm} onChange={(e) => zoek(e.target.value)} placeholder="Typ uw naam of e-mailadres…" style={{ borderColor: C.line, background: C.surface, color: C.text }} className="w-full rounded-xl border-2 px-4 py-3 text-base outline-none mb-3" />
          {zoekBezig && <div style={{ color: C.muted }} className="text-sm mb-2">Zoeken…</div>}
          {!zoekBezig && zoekterm.length >= 2 && zoekRes.length === 0 && <div style={{ color: C.muted }} className="text-sm mb-4">Niet gevonden. <button onClick={() => setKlantModus("nieuw")} style={{ color: B }} className="font-bold underline">Als nieuw verdergaan</button></div>}
          {zoekRes.length > 0 && <div style={{ borderColor: C.line }} className="rounded-xl border-2 overflow-hidden mb-4">{zoekRes.map((k) => (<button key={k.id} onClick={() => kiesKlant(k)} style={{ borderColor: C.line, background: C.surface }} className="w-full text-left px-4 py-3.5 border-b last:border-b-0"><div style={{ color: C.text }} className="font-bold">{k.displayName}</div><div style={{ color: C.muted }} className="text-xs mt-0.5">{k.email}{k.phoneNumber ? " · " + k.phoneNumber : ""}</div></button>))}</div>}
          <button onClick={() => setKlantModus(null)} style={{ color: C.muted }} className="text-sm underline">← Terug</button></div>)}
        {klantModus === "nieuw" && (<div className="space-y-3">{[["naam", "Naam *"], ["email", "E-mailadres"], ["tel", "Telefoonnummer"]].map(([k, ph]) => (<input key={k} placeholder={ph} value={klant[k]} onChange={(e) => setKlant((c) => ({ ...c, [k]: e.target.value }))} style={{ borderColor: C.line, background: C.surface, color: C.text }} className="w-full rounded-xl border-2 px-4 py-3 text-base outline-none" />))}
          {nFout && <p style={{ color: R }} className="text-sm font-bold">{nFout}</p>}
          <button onClick={maakKlant} disabled={nBezig || !klant.naam} style={{ color: "#fff", opacity: klant.naam && !nBezig ? 1 : 0.5 }} className="btn-cta w-full rounded-xl py-3.5 font-bold">{nBezig ? "Bezig…" : "Verder →"}</button>
          <button onClick={() => setKlantModus(null)} style={{ color: C.muted }} className="text-sm underline w-full text-center">← Terug</button></div>)}
      </div></div>);
  }

  // ---------- KEUZE: samenstellen / showroom ----------
  if (mode === "keuze") {
    return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Welkom" />
      <div className="px-5 md:px-10 py-10 max-w-3xl">
        <h2 style={{ color: B }} className="ff-display text-3xl mb-1">Wat wilt u doen?</h2>
        <p style={{ color: C.muted }} className="text-sm mb-8">Kies hoe u verder wilt.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={() => setMode("config")} style={{ background: C.surface, borderColor: C.line }} className="opt rounded-2xl border-2 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg">
            <div style={{ background: C.blueTint }} className="rounded-xl h-32 flex items-center justify-center mb-4"><Illu kind="bedtop" breedte={160} /></div>
            <div style={{ color: B }} className="ff-display text-xl">Bed samenstellen</div>
            <div style={{ color: C.muted }} className="text-sm mt-1">Stel uw boxspring helemaal naar wens samen.</div>
          </button>
          <button onClick={() => setMode("showroom")} style={{ background: C.surface, borderColor: C.line }} className="opt rounded-2xl border-2 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg">
            <div style={{ background: "#FDECEC" }} className="rounded-xl h-32 flex items-center justify-center mb-4"><Illu kind="voetbord" /></div>
            <div style={{ color: R }} className="ff-display text-xl">Showroommodel kopen</div>
            <div style={{ color: C.muted }} className="text-sm mt-1">Direct uit onze outlet, met korting.</div>
          </button>
        </div>
        <button onClick={() => setMode("klant")} style={{ color: C.muted }} className="text-sm underline mt-6">← Terug</button>
      </div></div>);
  }

  if (laadStatus === "laden" || laadStatus === "start") return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Laden" /><div className="px-10 py-20 text-center" style={{ color: C.muted }}>Artikelen laden uit Business Central…</div></div>);
  if (laadStatus === "fout") return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Fout" /><div className="px-10 py-20 text-center" style={{ color: R }}>Kon Business Central niet bereiken.</div></div>);

  // ---------- SHOWROOM ----------
  if (mode === "showroom") {
    const outlet = (data.OVR || []).filter((x) => /outlet|showroom/i.test(x.displayName));
    return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Showroom / Outlet" />
      <div className="px-5 md:px-10 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6"><h2 style={{ color: B }} className="ff-display text-2xl md:text-3xl">Showroommodellen</h2><button onClick={() => setMode("keuze")} style={{ color: B }} className="text-sm font-bold">← Terug</button></div>
        {outlet.length === 0 ? <p style={{ color: C.muted }} className="text-sm">Er staan nog geen showroommodellen in Business Central (categorie outlet). Voeg ze toe en ze verschijnen hier automatisch.</p>
          : <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{outlet.map((it) => <VCard key={it.number} kind="voetbord" titel={stripMaat(it.displayName)} prijs={it.prijs} onClick={() => {}} />)}</div>}
      </div></div>);
  }

  // ---------- CONFIG STAPPEN ----------
  const STAPPEN = ["Maat", "Onderbak", "Bodem", "Matras", "Topper", "Stoffering", "Hoofdbord", "Voetbord", "Opties", "Overzicht"];
  const last = stap === STAPPEN.length - 1;
  const kanVerder = stap === 0 ? !!maat : true;
  const cardGrid = (arr, key, kind, incl) => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {incl && <VCard active={sel[key] === null} onClick={() => set(key, null)} kind={kind} titel={incl} prijs={0} />}
      {arr.length === 0 && !incl && <div style={{ color: C.muted }} className="text-sm col-span-full">Geen opties voor deze maat.</div>}
      {arr.map((it) => <VCard key={it.number} active={sel[key]?.number === it.number} onClick={() => set(key, sel[key]?.number === it.number ? null : it)} kind={kind} foto={it.foto} titel={stripMaat(it.displayName)} prijs={it.prijs} />)}
    </div>
  );

  const renderStap = () => {
    switch (STAPPEN[stap]) {
      case "Maat":
        return (<div>
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Kies de breedte</div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
            {breedtes.map((b) => (<button key={b.breedte} onClick={() => { setBreedteSel(b.breedte); setMaat(null); }} style={{ borderColor: breedteSel === b.breedte ? B : C.line, background: breedteSel === b.breedte ? C.blueTint : C.surface }} className="opt rounded-xl border-2 overflow-hidden">
              <div className="h-20 flex items-center justify-center"><Illu kind="bedtop" breedte={b.breedte} /></div>
              <div style={{ color: C.text }} className="font-bold py-1.5 text-sm">{b.breedte} cm</div></button>))}
          </div>
          {breedteSel && (<><div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Kies de lengte</div>
            <div className="flex gap-2 flex-wrap">{(breedtes.find((b) => b.breedte === breedteSel)?.lengtes || []).map((l) => { const a = maat?.breedte === breedteSel && maat?.lengte === l; return (<button key={l} onClick={() => setMaat({ breedte: breedteSel, lengte: l })} style={{ borderColor: a ? B : C.line, background: a ? C.blueTint : C.surface, color: C.text }} className="opt rounded-xl border-2 px-6 py-3 font-bold">{breedteSel} × {l}</button>); })}</div></>)}
        </div>);
      case "Onderbak": {
        const obs = opMaat(data.OND);
        const hoogtes = [...new Set(obs.map((x) => (x.displayName.match(/(\d+)\s*cm/) || [])[1]).filter(Boolean))];
        const verings = [...new Set(obs.map((x) => /hard/i.test(x.displayName) ? "Hard" : "Pocket geveerd"))];
        const gekozen = obs.find((x) => (x.displayName.match(/(\d+)\s*cm/) || [])[1] === obHoogte && (/hard/i.test(x.displayName) ? "Hard" : "Pocket geveerd") === obVering);
        if (gekozen && sel.onderbak?.number !== gekozen.number) set("onderbak", gekozen);
        return (<div>
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Hoogte</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">{hoogtes.map((h) => (<button key={h} onClick={() => setObHoogte(h)} style={{ borderColor: obHoogte === h ? B : C.line, background: C.surface }} className="opt rounded-2xl border-2 overflow-hidden"><div style={{ background: obHoogte === h ? C.blueTint : "#F7F9FD" }} className="h-24 flex items-center justify-center"><Illu kind="onderbak" /></div><div style={{ color: C.text }} className="font-bold py-2">{h} cm</div></button>))}</div>
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Uitvoering</div>
          <div className="flex gap-2 flex-wrap">{verings.map((v) => (<button key={v} onClick={() => setObVering(v)} style={{ borderColor: obVering === v ? B : C.line, background: obVering === v ? C.blueTint : C.surface, color: C.text }} className="opt rounded-xl border-2 px-5 py-2.5 font-bold text-sm">{v}</button>))}</div>
        </div>);
      }
      case "Bodem":
        return (<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <VCard active={sel.bodem === null} onClick={() => set("bodem", null)} kind="onderbak" titel="Vlakke bodem" sub="Standaard" prijs={0} />
          {opMaat(optBodem).map((it) => <VCard key={it.number} active={sel.bodem?.number === it.number} onClick={() => set("bodem", it)} kind="optie" titel={stripMaat(it.displayName)} prijs={it.prijs} />)}
        </div>);
      case "Matras":
        return (<div>
          {maat?.breedte >= 160 && (<label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={sel.deelbaar} onChange={(e) => { set("deelbaar", e.target.checked); set("matras", null); set("matrasR", null); }} /><span style={{ color: C.text }} className="text-sm font-bold">Deelbaar matras (2 losse matrassen van {Math.round(maat.breedte / 2)} cm)</span></label>)}
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Kies een type</div>
          <div className="flex gap-2 mb-5 flex-wrap">{matrasTypes.map((t) => (<button key={t} onClick={() => setMatType(t)} style={{ background: matType === t ? C.blueTint : C.surface, borderColor: matType === t ? B : C.line, color: C.text }} className="opt px-5 py-2.5 rounded-xl border-2 font-bold text-sm">{t}</button>))}</div>
          {matType ? (<>
            <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">{sel.deelbaar ? "Matras links" : "Uitvoering"} ({matType})</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{matrasVarianten.map((it) => <VCard key={it.number} active={sel.matras?.number === it.number} onClick={() => set("matras", it)} kind="matras" foto={it.foto} titel={stripMaat(it.displayName).replace(/^Matras\s*/i, "")} prijs={it.prijs} />)}</div>
            {sel.deelbaar && (<><div style={{ color: C.muted }} className="text-[13px] font-bold mb-2 mt-5">Matras rechts ({matType})</div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{matrasVarianten.map((it) => <VCard key={it.number} active={sel.matrasR?.number === it.number} onClick={() => set("matrasR", it)} kind="matras" foto={it.foto} titel={stripMaat(it.displayName).replace(/^Matras\s*/i, "")} prijs={it.prijs} />)}</div></>)}
          </>) : <div style={{ color: C.muted }} className="text-sm">Kies eerst een type matras.</div>}
        </div>);
      case "Topper": {
        const alle = opMaat(data.TOP); const split = alle.filter((x) => /split/i.test(x.displayName)); const gewoon = alle.filter((x) => !/split/i.test(x.displayName));
        return (<div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-2"><VCard active={sel.topper === null} onClick={() => set("topper", null)} kind="topper" titel="Geen topper" prijs={0} /></div>
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2 mt-4">Topper</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{gewoon.map((it) => <VCard key={it.number} active={sel.topper?.number === it.number} onClick={() => set("topper", it)} kind="topper" foto={it.foto} titel={stripMaat(it.displayName)} prijs={it.prijs} />)}</div>
          {split.length > 0 && (<><div style={{ color: C.muted }} className="text-[13px] font-bold mb-2 mt-5">Splittopper</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{split.map((it) => <VCard key={it.number} active={sel.topper?.number === it.number} onClick={() => set("topper", it)} kind="splittopper" foto={it.foto} titel={stripMaat(it.displayName)} prijs={it.prijs} />)}</div></>)}
        </div>);
      }
      case "Stoffering":
        return (<div className="max-w-md">
          <div style={{ color: C.muted }} className="text-[13px] font-bold mb-2">Kies een stof</div>
          <select value={sel.stoffering?.number || ""} onChange={(e) => set("stoffering", stofLijst.find((x) => x.number === e.target.value) || null)} style={{ borderColor: C.line, background: C.surface, color: C.text }} className="w-full rounded-xl border-2 px-4 py-3 text-base outline-none">
            <option value="">— Kies een stof —</option>
            {stofLijst.map((it) => <option key={it.number} value={it.number}>{stripMaat(it.displayName)} ({euro(it.prijs)})</option>)}
          </select>
          <p style={{ color: C.muted }} className="text-[12px] mt-3">De stoffen worden in de winkel toegelicht met stalen. 650+ mogelijkheden.</p>
        </div>);
      case "Hoofdbord":
        return (<div>
          <label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={hbUitsteek} onChange={(e) => setHbUitsteek(e.target.checked)} /><span style={{ color: C.text }} className="text-sm font-bold">Hoofdbord 2×10 cm breder (steekt voorbij de bak)</span></label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <VCard active={sel.hoofdbord === null} onClick={() => { set("hoofdbord", null); setHbModel(null); }} kind="hoofdbord" titel="Geen hoofdbord" prijs={0} />
            {hbModellen.map((model) => { const it = (data.HBO || []).find((x) => new RegExp(model, "i").test(x.displayName) && x.breedte === maat.breedte); return (<VCard key={model} active={hbModel === model} onClick={() => hbKies(model)} onZoom={() => setLightbox({ kind: "hoofdbord", titel: model })} kind="hoofdbord" foto={it?.foto} titel={model} prijs={it?.prijs} />); })}
          </div>
        </div>);
      case "Voetbord": {
        let vbs = data.VBO || [];
        if (hbModel) { const zelfde = vbs.filter((x) => new RegExp(hbModel, "i").test(x.displayName)); if (zelfde.length) vbs = zelfde; }
        vbs = opBreedte(vbs);
        return (<div>
          {hbModel && <p style={{ color: C.muted }} className="text-[12px] mb-3">Uitgangspunt: voetbord passend bij hoofdbord <b>{hbModel}</b>. Kies hoogte of een tv-lift variant.</p>}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <VCard active={sel.voetbord === null} onClick={() => set("voetbord", null)} kind="voetbord" titel="Geen voetbord" prijs={0} />
            {vbs.map((it) => <VCard key={it.number} active={sel.voetbord?.number === it.number} onClick={() => set("voetbord", it)} kind="voetbord" foto={it.foto} titel={stripMaat(it.displayName)} sub={/tv/i.test(it.displayName) ? "met tv-lift" : null} prijs={it.prijs} />)}
          </div>
        </div>);
      }
      case "Opties":
        return (<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{opMaat(optExtra).length === 0 && <div style={{ color: C.muted }} className="text-sm col-span-full">Geen extra opties voor deze maat.</div>}
          {opMaat(optExtra).map((it) => { const a = sel.opties.some((o) => o.number === it.number); return <VCard key={it.number} active={a} onClick={() => set("opties", a ? sel.opties.filter((o) => o.number !== it.number) : [...sel.opties, it])} kind="optie" titel={stripMaat(it.displayName)} prijs={it.prijs} />; })}
        </div>);
      case "Overzicht":
        return (<div>
          <div style={{ background: C.surface, borderColor: C.line }} className="rounded-xl border-2 overflow-hidden mb-5"><div style={{ background: B, color: "#fff" }} className="px-4 py-2.5 ff-display">Klant: {klant.naam}</div><div className="px-4 py-2 text-[13px]" style={{ color: C.muted }}>{klant.email} · {klant.tel}</div></div>
          {!verzonden ? (<div>{bcFout && <p style={{ color: R }} className="text-[13px] font-bold mb-2">{bcFout}</p>}<button onClick={naarBc} disabled={bezig || regels.length === 0} style={{ color: "#fff", opacity: bezig || regels.length === 0 ? 0.5 : 1 }} className="btn-cta w-full rounded-xl py-3.5 font-bold flex items-center justify-center gap-2"><Send size={16} /> {bezig ? "Bezig met versturen…" : "Naar offerte in Business Central"}</button></div>)
            : (<div style={{ background: "#E8F5E9", borderColor: "#A5D6A7" }} className="rounded-xl border-2 p-5"><div className="flex items-center gap-2 mb-2"><span style={{ background: "#4CAF50" }} className="w-3 h-3 rounded-full" /><span style={{ color: "#2E7D32" }} className="font-bold text-sm">Offerte aangemaakt in Business Central!</span></div><div className="text-sm" style={{ color: C.text }}><b>Offertenummer:</b> {bcRes?.quoteNumber} · <b>Klant:</b> {bcRes?.customerName}</div></div>)}
        </div>);
      default: return null;
    }
  };

  return (<div style={{ background: C.bg, minHeight: "100%" }} className="w-full">{styleTag}<Header sub="Samenstellen" />
    <div className="px-5 md:px-10 pt-4 flex items-center justify-between">
      <div className="text-[13px]" style={{ color: C.muted }}>{maat ? "Maat: " : ""}<span style={{ color: C.text }} className="font-bold">{maat ? `${maat.breedte} × ${maat.lengte}` : "Kies een maat"}</span></div>
      <div className="flex items-center gap-3"><span style={{ background: "#E7F6EC", color: "#1B7A3D" }} className="text-[12px] font-bold px-3 py-1 rounded-full">● Live uit BC</span><button onClick={() => setMode("keuze")} style={{ color: B }} className="text-[13px] font-bold">← Menu</button></div>
    </div>
    <div className="px-5 md:px-10 pt-4">
      <div className="flex items-center gap-1.5">{STAPPEN.map((s, i) => (<button key={s} onClick={() => (i === 0 || maat) && setStap(i)} title={s} className="flex-1 h-1.5 rounded-full transition-colors" style={{ background: i === stap ? R : i < stap ? B : C.line }} />))}</div>
      <div style={{ color: C.muted }} className="text-[12px] mt-2 font-bold">{STAPPEN[stap]} · stap {stap + 1}/{STAPPEN.length}</div>
    </div>
    <div className="px-5 md:px-10 py-6 grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl">
      <div>
        <h2 style={{ color: B }} className="ff-display text-2xl md:text-3xl mb-4">{STAPPEN[stap]}</h2>
        {renderStap()}
        <div className="flex items-center justify-between mt-8">
          <button onClick={() => setStap((s) => Math.max(0, s - 1))} disabled={stap === 0} style={{ color: stap === 0 ? "#aeb7c2" : B }} className="flex items-center gap-1 text-sm font-bold"><ChevronLeft size={16} /> Vorige</button>
          {!last && <button onClick={() => kanVerder && setStap((s) => s + 1)} disabled={!kanVerder} style={{ color: "#fff", opacity: kanVerder ? 1 : 0.5 }} className="btn-blue flex items-center gap-1.5 rounded-full pl-5 pr-4 py-2.5 text-sm font-bold">Volgende <ChevronRight size={16} /></button>}
        </div>
      </div>
      <div className="md:sticky md:top-5 self-start">
        <div style={{ background: C.surface, borderColor: C.line }} className="rounded-2xl border-2 overflow-hidden">
          <div style={{ background: B, color: "#fff" }} className="px-5 py-3 ff-display">Jouw samenstelling</div>
          <div className="px-5 py-4 space-y-2">{regels.length === 0 && <div style={{ color: C.muted }} className="text-[13px] italic">Nog niets gekozen</div>}
            {regels.map((r, i) => (<div key={i} className="flex items-start justify-between gap-2 text-[12.5px]"><span style={{ color: C.text }} className="leading-snug flex-1">{r.label}</span><span style={{ color: C.muted }} className="whitespace-nowrap">{r.prijs ? euro(r.prijs) : "incl."}</span></div>))}</div>
          <div style={{ borderColor: C.line }} className="border-t px-5 py-4 flex items-center justify-between"><span style={{ color: C.text }} className="font-bold">Totaal</span><span style={{ color: B }} className="ff-display text-2xl">{euro(totaal)}</span></div>
        </div>
        <p style={{ color: C.muted }} className="text-[11px] mt-2 px-1">Prijzen excl. btw, live uit Business Central.</p>
      </div>
    </div>
    {lightbox && (<div onClick={() => setLightbox(null)} style={{ background: "rgba(8,14,28,0.94)" }} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6">
      <button onClick={() => setLightbox(null)} style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"><X size={20} /></button>
      <div style={{ transform: "scale(2.5)" }}><Illu kind={lightbox.kind} /></div>
      <div className="text-white ff-display text-2xl mt-10">{lightbox.titel}</div></div>)}
  </div>);
}
