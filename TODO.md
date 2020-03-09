# AnD2 TODO LIST

# Secure message
  [ ] view: input form, output form
  [ ] import aesjs
  [x] copy - paste function

# About
  [x] Add click event -> open browser
  [x] Fix share via...
  [x] Fix goBack if there is no previous page

# Date-diff
  [ ] View
  [x] Convert old code (java) to javascript
## Date-diff setting
  [x] Reset - Settings - Done
  [x] Select start - end date -> storage

# App
  [x] Dark theme -> storage

# fsesdfasdfsdf
```java
  public String calDateDiffYMD() {
    String result = "";

    long timeStampDiff = this.dateNow.getTime() - this.dateBegin.getTime();
    long daysDiff = timeStampDiff / (24 * 60 * 60 * 1000);

    int year = (int) daysDiff / 365;
    int month = (int) (daysDiff % 365) / 30;
    int day = (int) (daysDiff % 365) % 30;

    if (year > 0) {
      result = Integer.toString(year) + " years ";
    }
    if (month > 0) {
      result = result + Integer.toString(month) + " months ";
    }
    if (day > 0) {
      result = result + Integer.toString(day) + " days";
    }

    return result;
  }

  public String calDateDiffDays() {
    String result = "";

    try {

      long timeStampDiff = this.dateNow.getTime() - this.dateBegin.getTime();
      long daysDiff = timeStampDiff / (24 * 60 * 60 * 1000);

      result = Long.toString(daysDiff) + " days";

    } catch (Exception e) {
      Log.i(TAG, String.valueOf(e));
    }

    return result;
  }
```
