// Copyright 2017, Lira ltd. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @name AdWords GDN Placement Cleaner For Impressions (Report) script
 *
 * @overview The script allows you to manage Google Display Network
 *     GDN placements and remove common non effective placements about
 *     games, recipes, films, etc
 *     See
 *     https://lira.agency/
 *     for more details.
 *
 * @author Artem Akulov [help@lira.agency]
 *
 * @version 1.0
 *
 * @changelog
 * - version 1.0
 *   - Released initial version.
 */

// The spreadsheet for parse GDN titles. This should be a copy of
// https://docs.google.com/spreadsheets/d/1gECAF4iatFWDEnwKaZdnLLBCoW2-O6uOuZMOpQ94JaI/edit?usp=sharing

//Set link to your copy of Google Spreadsheet above
var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/14zZoMrMV1K41zMqRjla9jfIBOOUX7IRawYGIqlp3mwY/edit?usp=sharing';
  
var RawDataReport_Name = "RawDataReport"; //Don't change the name of the sheet if you use standart docs template
var RawDataReportSheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName(RawDataReport_Name);

function main() {
  createReports();
}
//Get placements with 1 and more clicks over last 7 days.
//It`s recommended to schedule script weekly
function createReports() {
    var RawDataReport = AdWordsApp.report("SELECT Domain, Clicks " + "FROM AUTOMATIC_PLACEMENTS_PERFORMANCE_REPORT " + "WHERE  Clicks > 0 " + "AND Conversions < 1 " + "DURING LAST_7_DAYS");
    RawDataReport.exportToSheet(RawDataReportSheet);
}